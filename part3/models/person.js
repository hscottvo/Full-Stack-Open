import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI

console.log("connecting to", url)
mongoose.connect(url)
    .then(_result => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.log("error connecting to MongoDB:", error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
personSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


export const Person = mongoose.model("Person", personSchema)

// export default { Person }

