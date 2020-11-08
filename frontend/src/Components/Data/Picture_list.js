import React, { Component } from 'react';
import axios from 'axios';
import PictureTable from './Picture_table'
import Selection from "./selection"
import { getContinentsList, getCountriesList, getPicturesList} from "./client"

class Picturelist extends Component{
    constructor(props) {
        super(props);
        this.state = {
            continents: [],
            countries: [],
            pictures: [],
            isLoaded: false,
            country:null
          };

      }

    

    componentDidMount() {

        axios.all([
            getContinentsList(),
            getCountriesList(),
            getPicturesList()
            ])
            .then(axios.spread((continents, countries, pictures) => {
                this.setState({ continents, isLoaded: true });
                this.setState({ countries, isLoaded: true });
                this.setState({ pictures, isLoaded: true });
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

                <Selection />

                <PictureTable pictures={this.state.pictures}/>

            </div>
        )
    }
}
}


export default Picturelist;