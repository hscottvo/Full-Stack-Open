import _ from 'lodash'
const dummy = () => {
    return 1
}

const totalLikes = (blogList) => {
    const reducer = (acc, val) => {
        return acc + val.likes
    }

    return blogList.reduce(reducer, 0)
}

const favoriteBlog = (blogList) => {
    const reducer = (acc, val) => {
        if (!acc) {
            return val
        }

        if (acc.likes < val.likes) {
            return val
        } else {
            return acc
        }
    }

    return blogList.reduce(reducer, undefined)
}

const mostBlogs = (blogList) => {
    if (blogList.length === 0) {
        return undefined
    }

    const counts = _.countBy(blogList, (object) => object.author)
    const mostBlogsAuthor = _.maxBy(Object.keys(counts), (key) => counts[key])
    return { author: mostBlogsAuthor, blogs: counts[mostBlogsAuthor] }
}

const mostLikes = (blogList) => {
    if (blogList.length === 0) {
        return undefined
    }

    const group = _.groupBy(blogList, (obj) => obj.author)

    const counts = _.reduce(
        group,
        (res, val, key) => {
            res[key] = _.reduce(
                val,
                (sum, blog) => {
                    return sum + blog.likes
                },
                0
            )
            return res
        },
        {}
    )

    const mostLikesAuthor = _.maxBy(Object.keys(counts), (key) => counts[key])
    return { author: mostLikesAuthor, likes: counts[mostLikesAuthor] }
}

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
