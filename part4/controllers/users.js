import bcrypt from 'bcrypt'
import express from 'express'
import { User } from '../models/user.js'

const usersRouter = express.Router()

usersRouter.get('/', async (_req, res) => {
    const allUsers = await User.find({}).populate('persons').populate('blogs')
    res.json(allUsers)
})

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body

    if (!(username && password)) {
        res.status(400).json({ error: 'Username and password are required' })
        return
    }

    if (username.length < 3 || password.length < 3) {
        res.status(400).json({
            error: 'Username and password both must be at least length 3',
        })
        return
    }

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
