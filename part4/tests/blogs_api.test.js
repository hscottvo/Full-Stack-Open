import { test, after, beforeEach, describe } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import helper from './test_helper.js'

import { Blog } from '../models/blogs.js'
const api = supertest(app)

describe('blogs test', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))

        const promiseArray = blogObjects.map((blog) => blog.save())
        await Promise.all(promiseArray)
    })

    describe('get blogs', () => {
        test('invalid id returns 400', async () => {
            await api.get(`/api/blogs/0`).expect(400)
        })
        test('blogs are returned as json', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('there are 2 blogs', async () => {
            const response = await api.get('/api/blogs')
            assert.strictEqual(response.body.length, helper.initialBlogs.length)
        })

        test('a specific blog can be viewed', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToView = blogsAtStart[0]

            const resultBlog = await api
                .get(`/api/blogs/${blogToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.deepStrictEqual(resultBlog.body, blogToView)
        })
    })

    describe('create blogs', () => {
        test('a valid blog can be added ', async () => {
            const newBlog = {
                title: 'fourth book',
                author: 'definitely scott',
                url: 'ddg.com',
                likes: 100,
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(
                blogsAtEnd.length,
                helper.initialBlogs.length + 1
            )

            const names = blogsAtEnd.map((n) => n.title)
            assert(names.includes('fourth book'))
        })

        test('a blog created without likes defaults to 0 like', async () => {
            const newBlog = {
                title: 'fifth book',
                author: 'perhaps scott',
                url: 'a.com',
            }

            const returnedBlog = await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            assert.strictEqual(returnedBlog._body.likes, 0)
        })

        test('a blog without a title is not added', async () => {
            const newBlog = {
                author: 'definitely scott',
                url: 'ddg.com',
                likes: 100,
            }

            await api.post('/api/blogs').send(newBlog).expect(400)

            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        })

        test('a blog without an author is not added', async () => {
            const newBlog = {
                title: 'fourth book',
                url: 'ddg.com',
                likes: 100,
            }

            await api.post('/api/blogs').send(newBlog).expect(400)

            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        })

        test('a blog without a url is not added', async () => {
            const newBlog = {
                title: 'fourth book',
                author: 'definitely scott',
                likes: 100,
            }

            await api.post('/api/blogs').send(newBlog).expect(400)

            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        })
    })

    describe('blog data validation', () => {
        test("blogs have an 'id' field rather than a '_id' field", async () => {
            const blogs = await helper.blogsInDb()
            blogs.forEach((blog) => {
                const blogFields = Object.keys(blog)
                assert(blogFields.includes('id'))
                assert(!blogFields.includes('_id'))
            })
        })
    })

    describe('delete blogs', () => {
        test('invalid id returns 400', async () => {
            await api.delete(`/api/blogs/0`).expect(400)
        })

        test('a blog can be deleted', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            const contents = blogsAtEnd.map((r) => r.title)
            assert(!contents.includes(blogToDelete.content))

            assert.strictEqual(
                blogsAtEnd.length,
                helper.initialBlogs.length - 1
            )
        })
    })

    describe('update blogs', () => {
        test('update an existing blog', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const updateId = blogsAtStart[0].id

            const newBlog = {
                title: 'test_title',
                author: 'test_author',
                url: 'test_url',
                likes: 100,
            }

            const returnedBlog = await api
                .put(`/api/blogs/${updateId}`)
                .send(newBlog)
                .expect(200)

            delete returnedBlog.body.id

            assert.deepStrictEqual(newBlog, returnedBlog.body)
        })
        test('try updating a non-existing blog', async () => {
            const newBlog = {
                title: 'test_title',
                author: 'test_author',
                url: 'test_url',
                likes: 100,
            }

            await api
                .put('/api/blogs/000000000000000000000000')
                .send(newBlog)
                .expect(404)
        })
        test('try updating a blog with a bad id', async () => {
            const newBlog = {
                title: 'test_title',
                author: 'test_author',
                url: 'test_url',
                likes: 100,
            }

            await api.put('/api/blogs/0').send(newBlog).expect(400)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})
