import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(_result => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.log("error connecting to MongoDB:", error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        required: true
    },
    number: {
        type: String,
        minLength: 10,
        required: true
    }
})
personSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


export const Person = mongoose.model("Person", personSchema)
