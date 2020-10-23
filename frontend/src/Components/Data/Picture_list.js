import React, { Component } from 'react';
import axios from 'axios';
import PictureTable from './Picture_table'


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
            axios.get('/api/continents'), 
            axios.get('/api/countries'),
            axios.get('/api/pictures'),
        ]).then(axios.spread((res1, res2, res3) => {
            this.setState({continents: res1.data, isLoaded: true});
            this.setState({countries: res2.data, isLoaded: true});
            this.setState({pictures: res3.data, isLoaded: true})
            //const data = JSON.stringify(this.state);
            //    console.log(data)
            }        
        ))
            .catch(errors => {
                console.log(errors);
            })
    }

    componentDidUpdate(prevProps, prevState) { //wrapped in a condition, or you’ll cause an infinite loop
       if (this.props.pictures !== prevProps.pictures) {
            axios.get('/api/pictures')
            .then(res => {
                this.setState({pictures: res.data, isLoaded: true});
            })
            .catch(function (error) {
                console.log(error);
            }) 
        }  
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

                <PictureTable pictures={this.state.pictures}/>

            </div>
        )
    }
}
}


export default Picturelist;