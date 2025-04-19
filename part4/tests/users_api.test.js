import { after, beforeEach, describe, test } from 'node:test'
import assert from 'node:assert'
import { User } from '../models/user.js'
import helper from './test_helper.js'
import supertest from 'supertest'
import app from '../app.js'
import mongoose from 'mongoose'
const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await helper.resetUsersTable()
        console.log(await User.find({}))
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map((u) => u.username)
        assert(usernames.includes(newUser.username))

        await helper.resetUsersTable()
    })

    test('creation fails with proper statuscode and message if username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)

        await helper.resetUsersTable()
    })
})

after(async () => {
    await mongoose.connection.close()
})
