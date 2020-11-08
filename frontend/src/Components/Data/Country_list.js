import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { getContinentsList, getCountriesList } from "./client"

class ContryList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            continents: [],
            countries: [],
            isLoaded: false,
          };

      }

    componentDidMount() {
        axios.all([
        getContinentsList(),
        getCountriesList(),
        ])
        .then(axios.spread((continents, countries) => {
            this.setState({ continents, isLoaded: true });
            this.setState({ countries, isLoaded: true });
          }))
    }

    render(){
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
          } else if (!isLoaded) {
            return(
            <div className = "item-selection">
                <div className="loading"><i className="fas fa-spinner fa-3x"></i></div>
            </div>
            )
          } else {
        return(
            <div className = "item-selection">

                <table>
                    <tbody>
                        <tr>
                            <th>Pays</th>
                            <th>Continent</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Description</th>
                            <th>Image</th>
                        </tr>               

                    {this.state.countries.map((country, index) => 
                        <tr key = {index}>
                            <td>{country.name}</td>
                            <td>{country.continent.name}</td>
                            <td>{country.lat}</td>
                            <td>{country.long}</td>
                            <td>{country.description}</td>
                            <td><img src={country.imageUrl} alt="" width="100%"/></td>
            
                            <td>
                                <Link to={`/admin/countries/edit/${country._id}`}>
                                    <button className="btn-modify" >Modifier</button>
                                </Link>
                            </td>
                        </tr> 
                    )}
                    </tbody>
                </table>
                
            </div>
        )
    }
}
}


export default ContryList;