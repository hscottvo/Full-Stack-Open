import Router from 'express'
import { Blog } from '../models/blogs.js'
import middleware from '../utils/middleware.js'

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

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
    const { title, author, url, likes } = req.body

    const user = req.user

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

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
    const user = req.user
    if (!user) {
        res.status(401).json({ error: 'invalid token' }).end()
    }
    const blogToDelete = await Blog.findById(req.params.id)
    if (!blogToDelete) {
        res.status(404).end()
    }
    if (!(String(user._id) === String(blogToDelete.user))) {
        res.status(401)
            .json({ error: 'user does not match owner of blog' })
            .end()
    }

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
