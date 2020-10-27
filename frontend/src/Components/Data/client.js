import axios from 'axios';
import headersAuth from "../Service/auth-header"

     
export function getContinentsList () {   
    return (
  
        axios.get('/api/continents/auth', { headers: headersAuth() })
            //axios.get('/api/continents/countries', {headers: headersAuth})
        .then(response => response.data)
            //this.setState({countries: res2.data, isLoaded: true})
            //const data = JSON.stringify(this.state);
            //console.log(data)
                      
        .catch(err => Promise.reject('Request Not Authenticated!'))
    )
}


export function getCountriesList () {
    axios.get('/api/countries/auth', { headers: headersAuth() })
    .then(response => response.data)
    .catch(err => Promise.reject('Request Not Authenticated!'))
}

export function getPicturesList () {
    axios.get('/api/pictures/auth', { headers: headersAuth() })
    .then(response => response.data)
    .catch(err => Promise.reject('Request Not Authenticated!'))
}


