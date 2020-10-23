import React , { Component } from 'react';
import axios from 'axios';

class ContinentsSelection extends Component{
    constructor(props) {
      super(props);
      this.state={
        CurrentContinent:"Asie",
        CurrentBg:null,
        continents: [],
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

    componentDidMount() {
      axios.get('/api/continents')
      .then(res => {
          this.setState({continents: res.data, isLoaded: true});
      }        
    )
      .catch(errors => {
          console.log(errors);
      })
}


render(){ 
  
  return(

    <div className = "continent-selection">
        <ul>
            {this.state.continents.map(continent=>( 
                <li id = {continent.name} key = {continent._id} onClick = {this.handleClick}>
                {continent.name}
                </li> 
            ))}
        </ul>
    </div>

    )
}
}


export default ContinentsSelection;