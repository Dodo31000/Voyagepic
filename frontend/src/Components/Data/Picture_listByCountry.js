import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PictureTable from './Picture_table'
import axios from 'axios';


class PictureByCountrylist extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            isLoaded: false,
          };

      }

    componentDidMount() {
        axios.get('/api/pictures/filter/'+this.props.match.params.countryId)
        .then(res => {
            this.setState({pictures: res.data, isLoaded: true})
            //const data = JSON.stringify(this.state);
             //   console.log(data)
            })        
            .catch(errors => {
                console.log(errors);
            })
    }

    render(){
        return(

            <div className="db">
                <div className="db-container">  
                    <div className="sub-db">

                    <h1>Liste des pictures de {this.props.match.params.countryId}</h1>             
                   
                              
                        <div className = "item-selection">  
                            <PictureTable pictures={this.state.pictures}/>
                        </div>

                        <div className = "buttons">
                            <Link to="/pictures">
                                <button><span>&#10094;</span> Retour</button>
                            </Link>
                        </div> 

                    </div>
                </div>
            </div>
        )
    }
}


export default PictureByCountrylist;