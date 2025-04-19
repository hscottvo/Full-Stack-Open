import bcrypt from 'bcrypt'
import { Person } from '../models/person.js'
import { Blog } from '../models/blogs.js'
import { User } from '../models/user.js'

const initialPersons = [
    {
        name: 'scott',
        number: '12-1212121212',
    },
    {
        name: 'not scott',
        number: '43-1212421',
    },
]

const initialBlogs = [
    {
        title: 'scott first book',
        author: 'scott',
        url: 'google.com',
        likes: 5,
        id: '67f8784cb1efe03f78c4194d',
    },
    {
        title: 'scott second book',
        author: 'not scott',
        url: 'yahoo.com',
        likes: 8,
        id: '12ff100127f8718097207070',
    },
]

const initialUsers = [
    {
        username: 'root',
        name: 'root-name',
        password: '12345',
    },
]

const personNonExistingId = async () => {
    const person = new Person({
        name: 'howdy',
        number: '43-201828',
    })
    await person.save()
    await person.deleteOne()
    return person._id.toString()
}

const blogNonExistingId = async () => {
    const blog = new Blog({
        title: 'third book',
        author: 'maybe scott',
        url: 'bing.com',
        likes: 10,
        id: '12ff100127f8718097299000',
    })
    await blog.save()
    await blog.deleteOne()
    return blog._id.toString()
}

const personsInDb = async () => {
    const persons = await Person.find({})
    return persons.map((person) => person.toJSON())
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map((user) => user.toJSON())
}

const resetUsersTable = async () => {
    await User.deleteMany({})

    const userPromiseArray = initialUsers.map(async (user) => {
        const passwordHash = await bcrypt.hash(user.password, 10)
        const newUser = new User({
            username: user.username,
            name: user.name,
            passwordHash,
        })
        return newUser
    })

    let users = await Promise.all(userPromiseArray)

    const savePromiseArray = users.map((user) => {
        user.save()
    })
    await Promise.all(savePromiseArray)
}

export default {
    initialPersons,
    initialBlogs,
    initialUsers,
    personNonExistingId,
    blogNonExistingId,
    personsInDb,
    blogsInDb,
    usersInDb,
    resetUsersTable,
}
