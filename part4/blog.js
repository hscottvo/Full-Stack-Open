import express from "express"
import mongoose from "mongoose"

import config from "./utils/config.js"

const app = express()

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    url: { type: String, required: true },
    likes: { type: Number, required: true },
})

blogSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model("Blog", blogSchema)

mongoose.connect(config.MONGODB_URI)

app.use(express.json())

app.get("/api/blogs", (_req, res) => {
    Blog.find({})
        .then((blogs) => {
            res.json(blogs)
        })
})

app.post("/api/blogs", (req, res) => {
    const blog = new Blog(req.body)

    blog
        .save()
        .then((result) => {
            res.status(201).json(result)
        })
        .catch(res.status(404).end())
})
app.delete("/api/blogs/:id", (req, res, next) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})
