import Router from "express"
import { Blog } from "../models/blogs.js"

const blogsRouter = Router()

blogsRouter.get("/", (_, res) => {
    Blog.find({})
        .then((blogs) => {
            res.json(blogs)
        })
})

blogsRouter.get("/:id", (req, res, next) => {
    Blog.findById(req.params.id)
        .then(blog => {
            if (blog) {
                res.json(blog)
            }
            else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.post("/", (req, res, next) => {
    const blog = new Blog(req.body)

    blog.save()
        .then(savedResult => {
            res.json(savedResult)
        })
        .catch(error => next(error))
})

blogsRouter.delete("/:id", (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => console.log(error))
})

blogsRouter.put("/:id", (req, res, next) => {
    const { title, author, url, likes } = req.body
    Blog.findById(req.params.id)
        .then(blog => {
            if (!blog) {
                res.status(404).end()
            }

            blog.title = title
            blog.author = author
            blog.url = url
            blog.likes = likes

            return blog
                .save()
                .then(updatedBlog => {
                    res.json(updatedBlog)
                })
                .catch(error => next(error))
        })
})

export default blogsRouter
