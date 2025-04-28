import Router from 'express'
import jwt from 'jsonwebtoken'
import { Blog } from '../models/blogs.js'
import { User } from '../models/user.js'

const blogsRouter = Router()

blogsRouter.get('/', async (_, res) => {
    const allBlogs = await Blog.find({}).populate('user')
    res.json(allBlogs)
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.json(blog)
    } else {
        res.status(404).end()
    }
})

const getTokenFrom = (req) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.post('/', async (req, res) => {
    const { title, author, url, likes } = req.body
    const decodedToken = jwt.decode(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken?.id) {
        return res.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({ title, author, url, likes, user: user.id })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)

    await user.save()

    res.status(201).json(savedBlog)
})

blogsRouter.delete('/', async (_req, res) => {
    await Blog.deleteMany()
    res.status(204).end()
})

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
    const { title, author, url, likes } = req.body
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
        res.status(404).end()
    }

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const returnedBlog = await blog.save()
    res.json(returnedBlog)
})

export default blogsRouter
