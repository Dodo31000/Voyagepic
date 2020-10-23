import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class ContinentList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            continents: [],
            countries: [],
            isLoaded:false
          };
    
      }

    componentDidUpdate(prevProps, prevState) { //wrapped in a condition, or you’ll cause an infinite loop
       if (this.props.continents !== prevProps.continents) {
            axios.get('/api/continents')
            .then(res => {
                this.setState({continents: res.data, isLoaded: true, countries: res.data});
            })
            .catch(function (error) {
                console.log(error);
            }) 
        }  
    }

    componentDidMount() {
        axios.all([
            axios.get('/api/continents'), 
            axios.get('/api/continents/countries')
        ]).then(axios.spread((res1, res2) => {
            this.setState({continents: res1.data, isLoaded: true});
            this.setState({countries: res2.data, isLoaded: true})
            //const data = JSON.stringify(this.state);
                //console.log(data)
            }        
        ))
            .catch(errors => {
                console.log(errors);
            })
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
                            <th>Continent</th>
                            <th>Pays</th>
                            <th>Picture</th>
                        </tr>               

                    {this.state.continents.map((continent, index) => 
                        <tr key = {index}>
                            <td>{continent.name}</td>

                            <td>
                            {continent.countries.length !==0 ?
                                continent.countries.map((country, index) => 
                                <small key = {index}>{country.name},</small> 
                                ):
                            <small>No country</small>
                            }
                            </td>

                            <td><img src={continent.imageUrl} alt="" width="100%"/></td>
                            <td>
                                <Link to={`/continents/edit/${continent._id}`}>
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

export default ContinentList;