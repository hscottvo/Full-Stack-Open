import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    passwordHash: String,
    persons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person',
        },
    ],
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        },
    ],
})

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        console.log(returnedObject)
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
        // delete returnedObject.persons
    },
})

export const User = mongoose.model('User', userSchema)
