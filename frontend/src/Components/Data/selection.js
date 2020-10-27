import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class Selection extends Component{
    constructor(props) {
        super(props);
        this.state = {
            continents: [],
            countries: [],
            pictures: [],
            isLoaded: false,
            continent:'',
            country:'',
          };
          this.handleChange = this.handleChange.bind(this);
      }

    handleChange(event){
        const name = event.target.name
        this.setState({
            [name]: event.target.value
        });
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        const headersAuth = { 
        'Content-Type': 'application/json', 
         Authorization: `Bearer ${user.token}`
     }

        axios.all([
            axios.get('/api/continents', { headers: headersAuth }), 
            axios.get('/api/countries', { headers: headersAuth }),
            axios.get('/api/pictures', { headers: headersAuth }),
        ]).then(axios.spread((res1, res2, res3) => {
            this.setState({continents: res1.data, isLoaded: true});
            this.setState({countries: res2.data, isLoaded: true});
            this.setState({pictures: res3.data, isLoaded: true})
            //const data = JSON.stringify(this.state);
             //   console.log(data)
            }        
        ))
            .catch(errors => {
                console.log(errors);
            })
    }


    render(){
        const{
            continent,
            country
          } = this.state   

        return(

            <div className="pictures-nav">
                <div className="input-box">
                    <label htmlFor="continent">Continent</label>
                    <select name="continent" id="continent" value={continent} onChange={this.handleChange}>
                        <option value="" >--sélectionner--</option> 
                        {this.state.continents.map((continent, index) => 
                            <option value={continent._id} key = {index}>{continent.name}</option> 
                        )}
                    </select>
                </div>

                <div className="input-box">
                    <label htmlFor="country">Country</label>
                    <select name="country" id="country" value={country} onChange={this.handleChange}>
                        <option value="" >--sélectionner--</option> 
                        {this.state.countries.filter(country => country.continent._id === continent).map((country, index) => 
                            <option value={country._id} key = {index}>{country.name}</option>     
                        )}
                    </select>
                </div>

                <Link to={`/pictures/${country}`}>
                    <button className="btn-link" >Filtrer</button>
                </Link>
                
            </div>

        )
    }
}


export default Selection;