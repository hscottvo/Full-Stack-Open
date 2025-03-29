const express = require("express")
const app = express()

app.use(express.json())

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    let id = 1
    while (persons.some(person => person.id === id.toString())) {
        id = Math.floor(Math.random() * 1_000_000_000)
    }
    return id
}

app.get("/info", (request, response) => {
    response.send(`<div>Phonebook has info for ${persons.length} people.</div><div>${new Date(Date.now())}</div>`)
})

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    if (!id) {
        response.status(400).end()
    }
    const item = persons.filter(person => person.id == id)[0]
    if (item) {
        response.json(item)
    }
    else {
        response.status(404).end()
    }
})

app.post("/api/persons/", (request, response) => {
    const body = request.body
    const id = generateId()
    const person = { "id": id.toString(), ...body }
    if (!(person.name && person.number)) {
        response.status(400).json({ "error": "the <name> and <number> fields are required" })
        return
    }
    if (persons.some(listPerson => listPerson.name === person.name)) {
        response.status(400).json({ "error": "Name must be unique." })
        return
    }
    persons = persons.concat(person)
    response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
