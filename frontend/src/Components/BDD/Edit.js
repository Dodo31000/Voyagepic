import React, { Component } from 'react';
import '../../scss/db_liste.scss';
import { Link } from "react-router-dom";
import ContinentForm from '../Data/Continent_form';
import CountryForm from '../Data/Country_form';
import PictureForm from '../Data/Picture_form';
import axios from 'axios';


class Edit extends Component{
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
          this.handleDelete = this.handleDelete.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.handleUrlChange = this.handleUrlChange.bind(this);
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

      handleDelete(){
        const params = this.props.match.params
        
        const user = JSON.parse(localStorage.getItem('user'))
        const headersAuth = { 
            'Content-Type': 'application/json', 
             Authorization: `Bearer ${user.token}`
         }

      const ObjCountry = new FormData()

      ObjCountry.append('file', this.state.imageUrl)
      ObjCountry.append('name', this.state.name)
      ObjCountry.append('continent', this.state.continent)
      ObjCountry.append('lat', this.state.lat)
      ObjCountry.append('long', this.state.long)
      ObjCountry.append('description', this.state.description)

        const objPictures = new FormData() 

        objPictures.append('file', this.state.imageUrl)
        objPictures.append('name', this.state.picName)
        objPictures.append('continent', this.state.continent)
        objPictures.append('country', this.state.country)
        objPictures.append('lat', this.state.lat)
        objPictures.append('long', this.state.long)
        objPictures.append('location', this.state.location)
        objPictures.append('legend', this.state.legend)

        axios.all([
          axios.delete('/api/'+params.item+'/auth/delete/'+params.id, { headers: headersAuth }),
          axios.post('/api/'+ params.item +'/auth/delete/'+params.id, 
            params.item === "continents" ? '' : (params.item === "countries" ? ObjCountry : objPictures),
            { headers: headersAuth }),   
      ]).then(axios.spread())

       window.setTimeout(this.props.history.push('/'+params.item), 2000);
       this.props.history.go();
      }


      handleSubmit = async (e) => {
        e.preventDefault()

        const params = this.props.match.params
        
        const user = JSON.parse(localStorage.getItem('user'))
        const headersAuth = { 
            'Content-Type': 'application/json', 
             Authorization: `Bearer ${user.token}`
         }

        const objContinents = new FormData() 

            objContinents.append('file', this.state.imageUrl)
            objContinents.append('name', this.state.name)

        const CountryData = new FormData()

            CountryData.append('file', this.state.imageUrl)
            CountryData.append('name', this.state.name)
            CountryData.append('continent', this.state.continent)
            CountryData.append('lat', this.state.lat)
            CountryData.append('long', this.state.long)
            CountryData.append('description', this.state.description)

        const objPictures = new FormData() 

            objPictures.append('file', this.state.imageUrl)
            objPictures.append('name', this.state.picName)
            objPictures.append('continent', this.state.continent)
            objPictures.append('country', this.state.country)
            objPictures.append('lat', this.state.lat)
            objPictures.append('long', this.state.long)
            objPictures.append('location', this.state.location)
            objPictures.append('legend', this.state.legend)
    

        await axios.put('/api/'+params.item+'/auth/update/'+params.id,  
            params.item === "continents" ? objContinents : (params.item === "countries" ? CountryData : objPictures), 
            { headers: headersAuth })

        window.setTimeout(this.props.history.push('/'+this.props.match.params.item), 2000);
        this.props.history.go();
      }

      componentDidMount() {
        const params = this.props.match.params
        const user = JSON.parse(localStorage.getItem('user'))
        const headersAuth = { 
            'Content-Type': 'application/json', 
             Authorization: `Bearer ${user.token}`
         }

        axios.all([
            axios.get('/api/continents/auth',{headers: headersAuth}),
            axios.get('/api/countries/auth', {headers: headersAuth}), 
            axios.get('/api/'+params.item+'/auth/'+ params.id, {headers: headersAuth}),
        ]).then(axios.spread((res1, res2, res3) => {
            this.setState({continents: res1.data, isLoaded: true});
            this.setState({countries: res2.data, isLoaded: true});
            this.setState({
              items: res3.data, 
              name: res3.data.name, 
              picName: res3.data.name, 
              imageUrl: res3.data.imageUrl, 
              image_preview: res3.data.imageUrl, 
              continent: res3.data.continent,
              country: res3.data.country,
              lat: res3.data.lat,
              long: res3.data.long,
              description: res3.data.description,
              location: res3.data.location,
              legend: res3.data.legend,
              isLoaded: true})
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
                        <h1>Modification de {item}</h1>
                        <p>Modifier le {item} _id : {this.props.match.params.id} </p>
                        
                        <h2>
                          {this.state.items.name}
                        </h2>

                        {item === "continents" ? 
                        <ContinentForm 
                            handleSubmit = {this.handleSubmit}
                            handleDelete = {this.handleDelete}
                            handleChange = {this.handleChange}
                            handleUrlChange = {this.handleUrlChange}
                            image_preview = {this.state.image_preview}
                            nameValue = {this.state.name}
                            paramsId = {this.props.match.params.id}
                        />:
                        (item === "countries" ? 
                        <CountryForm
                            continents = {this.state.continents}
                            handleSubmit = {this.handleSubmit}
                            handleDelete = {this.handleDelete}
                            handleChange = {this.handleChange}
                            handleUrlChange = {this.handleUrlChange}
                            image_preview = {this.state.image_preview}
                            nameValue = {this.state.name}
                            latValue = {this.state.lat}
                            longValue = {this.state.long}
                            continentValue = {this.state.continent}
                            descriptionValue = {this.state.description}
                            paramsId = {this.props.match.params.id}
                        />:
                        <PictureForm
                            continents = {this.state.continents}
                            countries = {this.state.countries}
                            handleSubmit = {this.handleSubmit}
                            handleDelete = {this.handleDelete}
                            handleUrlChange = {this.handleUrlChange}
                            handleChange = {this.handleChange}
                            image_preview = {this.state.image_preview}
                            nameValue = {this.state.picName}
                            continentValue = {this.state.continent}
                            countryValue = {this.state.country}
                            latValue = {this.state.lat}
                            longValue = {this.state.long}
                            locationValue = {this.state.location}
                            legendValue = {this.state.legend}
                            paramsId = {this.props.match.params.id}
                        />
                        )
                      }
                        

                        <div className = "buttons">
                            <Link to={`/${item}`}>
                                <button><span>&#10094;</span> Retour</button>
                            </Link>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
  
}



export default Edit;