import mongoose from 'mongoose'

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    url: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

blogSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

export const Blog = mongoose.model('Blog', blogSchema)
