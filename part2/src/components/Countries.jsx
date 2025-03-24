import { useState, useEffect } from "react"
import CountryService from "../services/CountryService"
const CountrySearch = ({ filter, handler }) => {
    return (
        <>
            find countries
            <input value={filter} onChange={handler} />
        </>
    )
}

const Flag = ({ flags }) => {
    return <img src={flags.png}></img>
}

const Languages = ({ languages }) => {
    const languageList = Object.values(languages)
    return (
        <>
            <h2>{languageList.length > 1 ? "Languages" : "Language"}</h2>
            <ul>
                {languageList.map(language => <li key={language}>{language}</li>)}
            </ul>
        </>
    )
}

const Weather = ({ name, capitalInfo }) => {
    const [lat, long] = capitalInfo.latlng
    const [temp, setTemp] = useState()
    const [wind, setWind] = useState()
    const [tempUnit, setTempUnit] = useState()
    const [windUnit, setWindUnit] = useState()
    CountryService.getWeather(lat, long).then(response => {
        setTemp(response.current.temperature_2m)
        setWind(response.current.wind_speed_10m)
        setTempUnit(response.current_units.temperature_2m)
        setWindUnit(response.current_units.wind_speed_10m)
    })
    return (
        <>
            <h2>Weather in {name}</h2>
            <div>{temp && tempUnit ? `Temperature: ${temp} ${tempUnit}` : ""}</div>
            <div>{wind && windUnit ? `Wind: ${wind} ${windUnit}` : ""}</div>
        </>
    )
}

const SingleCountry = ({ country }) => {
    const { name, area, capital, capitalInfo, languages, flags } = country
    return (
        <div>
            <h1>{name.common}</h1>
            <div>{capital}</div>
            <div>{area}</div>
            <Languages languages={languages} />
            <Flag flags={flags} />
            <Weather name={name.common} capitalInfo={capitalInfo} />
            <br />
        </div>
    )
}

const Country = ({ country }) => {
    const [show, setShow] = useState(false)
    const handleShow = () => {
        setShow(true)
    }
    return (
        show ?
            <SingleCountry country={country} />
            :
            <div>
                {country.name.common}
                <button onClick={handleShow}>Show</button>
            </div>
    )
}

const CountryList = ({ filter }) => {
    const [countryArray, setCountryArray] = useState([])
    useEffect(() => {
        CountryService.getAll().then(response => {
            setCountryArray(response)
        })
    }, [])

    const filteredArray = countryArray.filter(country => country.name.common.toLowerCase().includes(filter))

    if (filteredArray.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    if (filteredArray.length == 1) {
        return (
            <div>
                <SingleCountry country={filteredArray[0]} />
            </div>
        )
    }
    return (
        <div>
            {filteredArray.map(country =>
                <Country key={country.name.common} country={country} />
            )}
        </div>
    )
}

const Countries = () => {
    const [filter, setFilter] = useState("")
    const handleFilter = (event) => {
        setFilter(event.target.value.toLowerCase())
    }
    return (
        <>
            <CountrySearch filter={filter} handler={handleFilter} />
            <CountryList filter={filter} />
        </>
    )
}

export default Countries
