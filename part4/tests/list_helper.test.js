import { test, describe } from "node:test"
import assert from "node:assert"
import listHelper from "../utils/list_helper.js"

test("dummy returns one", () => {
    const blogs = []
    const result = listHelper.dummy(blogs)

    assert.strictEqual(result, 1)
})

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

const listWithFourBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 1,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 11,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'me',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    },
    {
        _id: 'ietrsnietnrsietr',
        title: 'Go To Statement Considered Harmful',
        author: 'you',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 11,
        __v: 0
    }
]

describe("total likes", () => {

    test("when list is empty, equals 0", () => {
        const result = listHelper.totalLikes(emptyList)
        assert.strictEqual(result, 0)
    })

    test("when list has only one blog, equals the likes of that blog", () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test("when list has multiple blogs, equals the likes of those blogs", () => {
        const result = listHelper.totalLikes(listWithFourBlogs)
        assert.strictEqual(result, 28)
    })
})

describe("favorite blog", () => {

    test("when list is empty, equals undefined", () => {
        const result = listHelper.favoriteBlog(emptyList)

        assert.deepStrictEqual(result, undefined)
    })

    test("when list has only one blog, equals that blog", () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        assert.deepStrictEqual(result, listWithOneBlog[0])
    })

    test("when list has multiple blogs, equals the first most-liked blog", () => {
        const result = listHelper.favoriteBlog(listWithFourBlogs)
        assert.deepStrictEqual(result, listWithFourBlogs[1])
    })
})

describe("most blogs", () => {

    test("when list is empty, return undefined", () => {
        const result = listHelper.mostBlogs(emptyList)
        assert.deepStrictEqual(result, undefined)
    })

    test("when list has only one blog, equals that blog's blogger", () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 1 })
    })

    test("when list has multiple blogs, equals any of the top-bloggers", () => {
        const result = listHelper.mostBlogs(listWithFourBlogs)
        assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 2 })
    })

})
