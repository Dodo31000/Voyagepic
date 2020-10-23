import React, { Component } from 'react';
import '../../scss/db_liste.scss';
import { Link } from "react-router-dom";
import CountryList from '../Data/Country_list';
import CountryForm from '../Data/Country_form';
import ContinentList from '../Data/Continent_list';
import ContinentForm from '../Data/Continent_form';
import PictureList from '../Data/Picture_list';
import PictureForm from '../Data/Picture_form';
import axios from 'axios';

function LinkTo ({ item }) {
        return(
        <Link to={`/${item}`}>
            <button className="btn-link" >{item}</button>
        </Link>
        )
    }


class List extends Component{
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            continents:[], 
            countries:[], 
            error: null,
            isLoaded: false,
            name:'',
            continent: '',
            country: '',
            lat: '',
            long: '',
            description: '',
            legend: '',
            location: '',
            imageUrl:null,
            image_preview: '',
            picName:''
          };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
      }
      

    handleChange(event){
        const name = event.target.name
        this.setState({
            [name]: event.target.value
        });
    }
      

    handleUrlChange(event){
        this.setState({imageUrl: event.target.files[0]});
        this.setState({picName: event.target.files[0].name});

        let image_as_base64 = URL.createObjectURL(event.target.files[0])
        let image_as_files = event.target.files[0];

        this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
        })
    }

    handleCancel(){
        this.setState({
            imageUrl:null,
            image_preview:'',
            image_file:'',
            picName:''
          })
    }


    resetForm(){
      this.setState({
        continent:'', 
        country:'',
        name: '', 
        lat:'', 
        long:'', 
        description:'',
        legend: '',
        location: '',
        imageUrl:null,
        picName:''
      })
    }

    handleSubmit(e){
        e.preventDefault()

        const continentData = new FormData() 

        continentData.append('file', this.state.imageUrl)
        continentData.append('name', this.state.name)

        const CountryData = new FormData()

            CountryData.append('file', this.state.imageUrl)
            CountryData.append('name', this.state.name)
            CountryData.append('continent', this.state.continent)
            CountryData.append('lat', this.state.lat)
            CountryData.append('long', this.state.long)
            CountryData.append('description', this.state.description)
        

        const params = this.props.match.params

        const pictureData = new FormData() 

        pictureData.append('file', this.state.imageUrl)
        pictureData.append('name', this.state.picName)
        pictureData.append('continent', this.state.continent)
        pictureData.append('country', this.state.country)
        pictureData.append('lat', this.state.lat)
        pictureData.append('long', this.state.long)
        pictureData.append('location', this.state.location)
        pictureData.append('legend', this.state.legend)

        /*axios.post('/api/'+params.item, params.item === "continents" ? continentData : (params.item === "countries" ? newCountry : pictureData))
            .then(res => {console.log(res.data)})
            .then(this.resetForm());
            const data = JSON.stringify(this.state);
            console.log(data)
            //continentData.push(newCountry)*/
    
            axios.all([
            axios.post('/api/'+params.item, params.item === "continents" ? continentData : (params.item === "countries" ? CountryData : pictureData)),
            //axios.put('/api/countries', newCountry)    
        ]).then(axios.spread((res1, res2) => {
            //console.log(res1.data);
            //console.log(res2.data);
        }))

        //window.setTimeout(this.props.history.push('/'+params.item), 2000);
       //this.props.history.go();
    }

    componentDidMount() {
            axios.all([
                axios.get('/api/continents'), 
                axios.get('/api/countries'),
                axios.get('/api/pictures')
            ]).then(axios.spread((res1, res2, res3) => {
                this.setState({continents: res1.data, isLoaded: true});
                this.setState({countries: res2.data, isLoaded: true});
                this.setState({pictures: res3.data, isLoaded: true});
                //const data = JSON.stringify(this.state);
                //console.log(data)
            }        
        ))
            .catch(errors => {
                console.log(errors);
            })
    }
        


    render(){
        const item = this.props.match.params.item
        return(

            <div className="db">
                <div className="db-container">  
                    <div className="sub-db">

                    <nav>
                        <LinkTo item="continents"/>
                        <LinkTo item="countries"/>
                        <LinkTo item="pictures"/>
                    </nav>

                    <h1>Liste des {item}</h1>
                    
                    {item === "continents" ? 
                    <div className = "item-box">
                        <ContinentList />
                        <ContinentForm 
                            handleSubmit={this.handleSubmit}
                            handleChange={this.handleChange}
                            handleUrlChange = {this.handleUrlChange}
                            handleCancel = {this.handleCancel}
                            image_preview = {this.state.image_preview}
                            nameValue={this.state.name}
                        />
                    </div>: 
                    (item === "countries" ? 
                    <div className = "item-box">
                        <CountryList />
                        <CountryForm
                            continents = {this.state.continents}
                            handleSubmit = {this.handleSubmit}
                            handleChange = {this.handleChange}
                            handleCancel = {this.handleCancel}
                            handleUrlChange = {this.handleUrlChange}
                            image_preview = {this.state.image_preview}
                            nameValue = {this.state.name}
                            latValue = {this.state.lat}
                            longValue = {this.state.long}
                            descriptionValue = {this.state.description}
                        />
                    </div>:
                    <div className = "item-box">
                        <PictureList />
                        <PictureForm
                            continents = {this.state.continents}
                            countries = {this.state.countries}
                            continentValue = {this.state.continent}
                            handleCancel = {this.handleCancel}
                            handleSubmit = {this.handleSubmit}
                            handleUrlChange = {this.handleUrlChange}
                            handleChange = {this.handleChange}
                            image_preview = {this.state.image_preview}
                            nameValue = {this.state.picName}
                            latValue = {this.state.lat}
                            longValue = {this.state.long}
                            locationValue = {this.state.location}
                            legendValue = {this.state.legend}
                        />
                    </div>
                    )
                    }
                    
                    

                    <div className = "buttons">
                        <Link to="/">
                            <button><span>&#10094;</span> Retour</button>
                        </Link>
                    </div> 

                    </div>
                </div>
            </div>
        )
    }
}


export default List;