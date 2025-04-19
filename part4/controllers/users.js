import bcrypt from 'bcrypt'
import express from 'express'
import { User } from '../models/user.js'

const usersRouter = express.Router()
// import { usersInDb } from '../tests/test_helper.js'

usersRouter.get('/', async (_req, res) => {
    const allUsers = await User.find({}).populate('persons')
    res.json(allUsers)
})

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

export default usersRouter
