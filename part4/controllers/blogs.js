import Router from "express"
import { Blog } from "../models/blogs.js"

const blogsRouter = Router()

blogsRouter.get("/", (_, res) => {
    Blog.find({})
        .then((blogs) => {
            res.json(blogs)
        })
})

blogsRouter.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.json(blog)
    }
    else {
        res.status(404).end()
    }
})

blogsRouter.post("/", async (req, res) => {
    const blog = new Blog(req.body)

    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

blogsRouter.put("/:id", async (req, res) => {
    const { title, author, url, likes } = req.body
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
        res.status(404).end()
    }

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes
})

export default blogsRouter
