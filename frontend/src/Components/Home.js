import React , { Component, Fragment } from 'react';
import '../scss/home.scss';
import axios from 'axios';
import { Link } from "react-router-dom";



class Home extends Component{
    constructor(props) {
      super(props);
      this.state={
        continents: [],
        pictures:[],
        countries:[],
        CurrentContinent:"Asie",
        isLoaded:false,
        }
        this.handleClick = this.handleClick.bind(this);
      }
      
    handleClick(event){
      this.setState({
          CurrentContinent: event.target.id,
        });
      event.target.classList.toggle("active");
    }


    handleWeel = (e) =>{
      var container = document.getElementById('country-selection')
      var containerScrollPosition = document.getElementById('country-selection').scrollLeft
      container.scrollTo({
          top: 0,
          left: containerScrollPosition + e.deltaY,
          behaviour: 'smooth'
      })
      //e.preventDefault()
    }

    componentDidMount() {
      axios.all([
          axios.get('/api/continents'), 
          //axios.get('/api/countries'),
          //axios.get('/api/pictures')
      ]).then(axios.spread((res1, res2, res3) => {
          this.setState({continents: res1.data, isLoaded: true});
          //this.setState({countries: res2.data, isLoaded: true});
          //this.setState({pictures: res3.data, isLoaded: true});
          const data = JSON.stringify(this.state);
          console.log(data)
      }        
  ))
      .catch(errors => {
          console.log(errors);
      })
}
    


render(){ 
  const{
    CurrentContinent
  } = this.state   

  return(
    <Fragment>
    {this.state.continents.filter(continent => continent.name === CurrentContinent).map((continent, index)=>( 
    <div key ={index} className="home" 
      style = { { background: `url('${continent.imageUrl}') no-repeat` } }
    >

      <div className = "home-container">
          <div className= "home-subcontainer">
              <div className = "selection">

                <div className = "continent-selection">
                  <ul>
                      {this.state.continents.map(continent=>( 
                        <li id = {continent.name} key = {continent._id} onClick = {this.handleClick}>
                        {continent.name}
                        </li> 
                      ))}
                  </ul>
                </div>
                  
                <div id = "country-selection" onWheel = {this.handleWeel} > 
                  <div className = "sub-country-selection" >

                  {this.state.continents.filter(continent => continent.name === CurrentContinent).map(continent => (
                      continent.countries.map((country, index)=>(
                          
                          <Link key = {index} to={`/Gallery/${continent.name}/${country.name}`}>
                          <figure>
                              <figcaption className = {country.name} >{country.name}</figcaption>

                              <p className = {country.name} >Explorer  &#10095;</p>
                   
                              <img
                                  className = {country.name} 
                                  src = {country.imageUrl}
                                  alt = {country.name}
                                  width = "100%"
                              />
                          </figure> 
                          </Link>
                        ))
                    ))}
                    
                    </div>
                </div> 
                
              </div>

          </div>
      </div>
    </div>
  ))}
</Fragment>
    )
  }
}

export default Home;