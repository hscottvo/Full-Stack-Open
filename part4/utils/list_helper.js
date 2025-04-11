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
        }
        else {
            return acc
        }
    }

    return blogList.reduce(reducer, undefined)
}

export default { dummy, totalLikes, favoriteBlog }
