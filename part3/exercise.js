import express, { json } from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import { Person } from "./models/person.js"
// import models from "./models/person.js"
// const { Person } = models

dotenv.config()
const app = express()


app.use(json())
app.use(express.static("dist"))
morgan.token("person", function (req, _) {
    if (req.method === "POST") {
        return JSON.stringify(req.body)
    }
    return
})
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :person",
    ),
)

const requestLogger = (request, _, next) => {
    console.log("Method:", request.method)
    console.log("Path:", request.path)
    console.log("Body:", request.body)
    console.log("---")
    next()
}
app.use(requestLogger)

const unknownEndpoint = (_, response) => {
    response.status(404).send({ error: "Endpoint not found" })
}

app.get("/info", (_, response) => {
    response.send(
        `<div>Phonebook has info for ${0} people.</div><div>${new Date(Date.now())}</div>`,
    )
})

app.get("/api/persons", (request, response) => {
    response.json({});
});

app.get("/api/persons/:id", (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.post("/api/persons/", (request, response) => {
    const body = request.body
    console.log(body)

    if (!body.name) {
        return response.status(400).json({ error: "Content missing" })
    }

    const person = new Person({
        name: body.name,
        number: body.number || "N/A"
    })

    person.save().then(savedNote => {
        response.json(savedNote)
    })
})

// app.delete("/api/persons/:id", (request, response) => {
//     const id = request.params.id
//     persons = persons.filter((person) => person.id !== id)
//
//     response.status(204).end()
// })

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
