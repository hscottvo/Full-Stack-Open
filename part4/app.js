import express from "express"
import mongoose from "mongoose"
import config from "./utils/config.js"
import logger from "./utils/logger.js"
import personsRouter from "./controllers/persons.js"
import middleware from "./utils/middleware.js"

const app = express()

logger.info("Connecting to", config.MONGODB_URI)
mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("connected to MongoDB")
    })
    .catch((error) => {
        logger.error("error connection to MongoDB:", error)
    })

app.use(express.static("dist"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/persons", personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
