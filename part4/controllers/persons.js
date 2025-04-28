import Router from 'express'
import jwt from 'jsonwebtoken'

const personsRouter = Router()

import { Person } from '../models/person.js'
import { User } from '../models/user.js'

personsRouter.get('/', async (_, response) => {
    const persons = await Person.find({})
    response.json(persons)
})

personsRouter.get('/:id', async (request, response) => {
    const person = await Person.findById(request.params.id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const getTokenFrom = (req) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

personsRouter.post('/', async (request, response) => {
    const { name, number } = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const person = new Person({
        name: name,
        number: number,
        user: user.id,
    })

    const savedPerson = await person.save()
    user.persons = user.persons.concat(savedPerson._id)
    await user.save()

    response.status(201).json(savedPerson)
})

personsRouter.delete('/:id', async (request, response) => {
    await Person.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

personsRouter.put('/:id', (request, response, next) => {
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

export default personsRouter
