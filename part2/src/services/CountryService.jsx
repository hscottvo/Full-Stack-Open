import axios from "axios"
const countryUrl = "https://studies.cs.helsinki.fi/restcountries/api"
const weatherUrl = "https://api.open-meteo.com/v1/forecast"

const getAll = () => {
    return axios
        .get(`${countryUrl}/all`)
        .then(response => response.data)
        .catch(err => alert(`Failed to fetch country data: ${err}`))
}

const getWeather = (lat, long) => {
    const date = new Date().toISOString().split('T')[0]

    return axios
        .get(weatherUrl, {
            params: {
                latitude: lat,
                longitude: long,
                current: "temperature_2m,wind_speed_10m",
                start_date: date,
                end_date: date,
                temperature_unit: "fahrenheit"
            }
        })
        .then(response => response.data)
        .catch(err => alert(`Failed to fetch country data: ${err}`))
}

export default { getAll, getWeather }
