import Router from "express"

const personsRouter = Router()

import { Person } from "../models/person.js"

personsRouter.get("/", async (_, response) => {
    const persons = await Person.find({})
    response.json(persons)
})

personsRouter.get("/:id", async (request, response) => {
    const person = await Person.findById(request.params.id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

personsRouter.post("/", async (request, response) => {
    const { name, number } = request.body

    const person = new Person({
        name: name,
        number: number
    })

    const savedPerson = await person.save()
    response.status(201).json(savedPerson)
})

personsRouter.delete("/:id", async (request, response) => {
    await Person.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

personsRouter.put("/:id", (request, response, next) => {
    const { name, number } = request.body

    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }

            person.name = name
            person.number = number

            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

export default personsRouter
