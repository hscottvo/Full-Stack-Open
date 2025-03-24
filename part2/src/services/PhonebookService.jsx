import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
        .catch(error => {
            console.log(error)
            alert(`Unable to read notes from ${baseUrl}`)
        })
}

const createNumber = newObject => {
    return getAll().then(getAllResponse => {
        if (getAllResponse.some(object => object.name == newObject.name)) {
            // return null
            if (window.confirm(`Number for ${newObject.name} already exists. Replace number with ${newObject.number}?`)) {
                const oldObject = getAllResponse.filter(obj => obj.name === newObject.name)[0]
                newObject = { ...newObject, id: oldObject.id }
                return axios.put(`${baseUrl}/${oldObject.id}`, newObject).then(response => response.data)
            }
            else {
                return null
            }
        } else {
            return axios.post(baseUrl, newObject).then(response => response.data)
        }
    })
}

const deleteNumber = (id, name, handler) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .catch(_ => { handler(name, "alreadyDeleted") })
}

export default { getAll, createNumber, deleteNumber }
