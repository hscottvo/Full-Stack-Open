import { test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import helper from './test_helper.js'

import { Person } from '../models/person.js'

beforeEach(async () => {
    await Person.deleteMany({})

    const personObjects = helper.initialPersons.map(
        (person) => new Person(person)
    )

    const promiseArray = personObjects.map((person) => person.save())
    await Promise.all(promiseArray)
})

const api = supertest(app)

test('persons are returned as json', async () => {
    await api
        .get('/api/persons')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are 2 notes', async () => {
    const response = await api.get('/api/persons')
    assert.strictEqual(response.body.length, helper.initialPersons.length)
})

test('a valid person can be added ', async () => {
    const newPerson = {
        name: 'jonathan',
        number: '09-23423413908',
    }

    await api
        .post('/api/persons')
        .send(newPerson)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const personsAtEnd = await helper.personsInDb()
    assert.strictEqual(personsAtEnd.length, helper.initialPersons.length + 1)

    const names = personsAtEnd.map((n) => n.name)
    assert(names.includes('jonathan'))
})

test('a person without a number is not added', async () => {
    const newPerson = {
        name: 'jonathan',
    }

    await api.post('/api/persons').send(newPerson).expect(400)

    const personsAtEnd = await helper.personsInDb()

    assert.strictEqual(personsAtEnd.length, helper.initialPersons.length)
})

test('a specific person can be viewed', async () => {
    const personsAtStart = await helper.personsInDb()
    const personToView = personsAtStart[0]

    const resultPerson = await api
        .get(`/api/persons/${personToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultPerson.body, personToView)
})

test('a note can be deleted', async () => {
    const personsAtStart = await helper.personsInDb()
    const personToDelete = personsAtStart[0]

    await api.delete(`/api/persons/${personToDelete.id}`).expect(204)

    const personsAtEnd = await helper.personsInDb()

    const contents = personsAtEnd.map((r) => r.name)
    assert(!contents.includes(personToDelete.content))

    assert.strictEqual(personsAtEnd.length, helper.initialPersons.length - 1)
})

after(async () => {
    await mongoose.connection.close()
})
