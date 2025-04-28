import Router from 'express'
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

blogsRouter.post('/', async (req, res) => {
    const { title, author, url, likes } = req.body

    const firstUser = await User.findOne({})

    const blog = new Blog({ title, author, url, likes, user: firstUser.id })

    const savedBlog = await blog.save()
    firstUser.blogs = firstUser.blogs.concat(savedBlog._id)

    await firstUser.save()

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
