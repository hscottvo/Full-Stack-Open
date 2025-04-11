import express from "express"
import mongoose from "mongoose"

import config from "./utils/config.js"
import blogsRouter from "./controllers/blogs.js"

mongoose.connect(config.MONGODB_URI)

const app = express()

app.use(express.json())

app.use("/api/blogs", blogsRouter)


app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})
