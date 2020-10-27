import axios from 'axios';
import headersAuth from "../Service/auth-header"

     
export function getContinentsList () {   
    return (
        axios.get('/api/continents/auth', { headers: headersAuth() })
        .then(response => response.data)
        .catch(err => Promise.reject('Request Not Authenticated!'))
    )
}


export function getCountriesList () {
    return (
    axios.get('/api/countries/auth', { headers: headersAuth() })
    .then(response => response.data)
    .catch(err => Promise.reject('Request Not Authenticated!'))
    )
}

export function getPicturesList () {
    return (
    axios.get('/api/pictures/auth', { headers: headersAuth() })
    .then(response => response.data)
    .catch(err => Promise.reject('Request Not Authenticated!'))
    )
}


