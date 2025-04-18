import express, { json } from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { Person } from './models/person.js'
// import models from "./models/person.js"
// const { Person } = models

dotenv.config()
const app = express()

morgan.token('person', function (req) {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
    return
})

const requestLogger = (request, _, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---')
    next()
}

app.use(express.static('dist'))
app.use(json())
app.use(requestLogger)
// app.use(
//     morgan(
//         ":method :url :status :res[content-length] - :response-time ms :person",
//     ),
// )

const errorHandler = (error, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

// const unknownEndpoint = (error, request, response, next) => {
//     response.status(404).send({ error: "Endpoint not found" })
//     next(error)
// }

app.get('/info', (_, response, next) => {
    Person.find({})
        .then((result) => {
            console.log(result)
            console.log(result.length)
            const infoString = `<div>Phonebook has info for ${result.length} people.</div><div>${new Date(Date.now())}</div>`
            response.send(infoString)
        })
        .catch((error) => {
            next(error)
        })
})

app.get('/api/persons', (_, response) => {
    // response.json({});
    Person.find({}).then((result) => {
        if (result) {
            response.json(result)
        } else {
            response.status(404).end()
        }
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch((error) => {
            console.log(error)
            next(error)
            // response.status(400).send({ error: "Malformatted id" })
        })
})

app.post('/api/persons/', (request, response, next) => {
    const body = request.body
    console.log(body)

    if (!body.name) {
        return response.status(400).json({ error: 'Content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number || 'N/A',
    })

    person
        .save()
        .then((savedNote) => {
            response.json(savedNote)
        })
        .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findById(request.params.id)
        .then((person) => {
            if (!person) {
                return response.status(404).end()
            }

            person.name = name
            person.number = number

            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch((error) => next(error))
})

// app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
