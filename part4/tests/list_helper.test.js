import { test, describe } from "node:test"
import assert from "node:assert"
import listHelper from "../utils/list_helper.js"

test("dummy returns one", () => {
    const blogs = []
    const result = listHelper.dummy(blogs)

    assert.strictEqual(result, 1)
})

describe("total likes", () => {
    const emptyList = []
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]
    const listWithTwoBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
        {
            _id: 'ietrsnietnrsietr',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 11,
            __v: 0
        }
    ]

    test("when list is empty, equals 0", () => {
        const result = listHelper.totalLikes(emptyList)
        assert.strictEqual(result, 0)
    })

    test("when list has only one blog, equals the likes of that blog", () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test("when list has multiple blogs, equals the likes of those blogs", () => {
        const result = listHelper.totalLikes(listWithTwoBlogs)
        assert.strictEqual(result, 16)
    })
})
