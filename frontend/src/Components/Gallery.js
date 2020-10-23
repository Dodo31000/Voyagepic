import React , { Component } from 'react';
import '../scss/gallery.scss';
import { Link } from "react-router-dom";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

L.Icon.Default.imagePath ='../node_modules/leaflet'

//To properly display the marker
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


//To get the gps coordinates of the selected country and display the corresponding map
class Gallery extends Component{
    constructor(props) {
        super(props);
        this.state = {
            continents: [],
            countries: [],
            isLoaded:false
          };

          this.handleShowMap = this.handleShowMap.bind(this);
          this.handleEnlargeImg = this.handleEnlargeImg.bind(this);
      }

    handleShowMap(event){
    event.target.nextSibling.nextSibling.classList.toggle("figure-hide");
    }

    handleEnlargeImg(event){
    event.target.parentNode.classList.toggle("enlarge-img");
    }
      
        
    handleWeelGallery = (e) =>{
    var container = document.getElementById('gallery-overflow')
    var containerScrollPosition = document.getElementById('gallery-overflow').scrollLeft
    container.scrollTo({
        top: 0,
        left: containerScrollPosition + e.deltaY,
        //behavior: 'smooth'
    })
    //e.preventDefault()
    }

    scrollToBeginingClick = (e) =>{
    var scrollContainer = document.getElementById('gallery-overflow')
    scrollContainer.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    })
    e.preventDefault()
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
            const data = JSON.stringify(this.state);
            console.log(data)
            }        
        ))
            .catch(errors => {
                console.log(errors);
        })
    }
    
      

render(){
    const continentName = this.props.match.params.continentName
    const countryName = this.props.match.params.countryName

    const{
        countries,
      } = this.state
    
    //push country coords in "position" tab
    /*const position =[]
    
    countries.filter(country => country.name === countryName).map((country)=>(
        (position.push(country.lat))
        ))


    countries.filter(country => country.name === countryName).map((country)=>(
        (position.push(country.long))
        ))*/

return /*position &&*/ (

    <div className = "gallery">  
        <div className = "sub-gallery" id="gallery-overflow" onWheel = {this.handleWeelGallery}>
            <div className = "gallery-container">
                <div className = "gallery-description">

                    <h1>{continentName} <img src="/img/icons8-world-100.png" alt='icon'/></h1>

                    <h2>{countryName} <FontAwesomeIcon icon={faThumbtack} /></h2>

                    {countries.filter(country => country.name === countryName).map((country, index)=>(
                        <p key={index}>{country.description}</p>
                    ))}

                    <Link to="/">
                        <button><span>&#10094;</span> Retour</button>
                    </Link>

                    {countries.filter(country => country.name === countryName).map((country, index)=>(
                        <div key={index} className="map">
                            <Map center={[`${country.lat}`, `${country.long}`]} zoom={5}>
                                <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                />
                                <Marker position={[`${country.lat}`, `${country.long}`]}></Marker>
                            </Map>
                        </div>
                    ))}
                   
                </div>
                
                <hr/>

                <div className = "gallery-pictures">
                    
                {countries.filter(country => country.name === countryName).map(country=>(
                    country.pictures.map((image, index)=>(

                        <div key={index} className="picture-box" 
                            style={{ height: "400px", width: "600px" }}>

                            <figcaption>{image.location} {image.legend}</figcaption>

                            <i className="fas fa-info"  onClick = {this.handleShowMap}></i>
                            <i className="fas fa-expand" onClick = {this.handleEnlargeImg}></i>

                            <figure 
                                style={{ background: `url(${image.imageUrl}) no-repeat center`, backgroundSize:"cover"}}
                                onClick = {this.handleEnlargeImg}>   
                            </figure>

                            <Map className=""  center={[`${image.lat}`, `${image.long}`]} zoom={6}>
                                <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                />
                                <Marker position={[`${image.lat}`, `${image.long}`]}>
                                    <Popup>{image.location}</Popup>
                                </Marker>
                            </Map>
                            
                        </div>
                        ))
                ))}

                </div>
            </div>
            
        </div>

        <div id = "scroll-to-begining" onClick = {this.scrollToBeginingClick}>&#10094;</div>
    </div>
    
    );
    }
}


export default Gallery;