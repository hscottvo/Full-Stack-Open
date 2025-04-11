const dummy = () => {
    return 1
}

const totalLikes = (blogList) => {
    const reducer = (acc, val) => {
        return acc + val.likes
    }

    return blogList.reduce(reducer, 0)
}

export default { dummy, totalLikes }
