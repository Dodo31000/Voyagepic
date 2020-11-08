import React, { Component } from 'react';
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
          this.reset = this.reset.bind(this);
      }

    handleChange(event){
        const name = event.target.name
        this.setState({
            [name]: event.target.value
        });
        
    }

    handlefilter(e){
        const contiVal = e.target.value.toLowerCase();
 
        document.querySelectorAll('.filterlist').forEach(conti => {
            const item = conti.firstChild.textContent;
 
            if (item.toLowerCase()===contiVal){
                conti.style.display ='table-row'; 
            }else{
                 conti.style.display ='none';
            }
        });
     }

     reset(){
        document.querySelectorAll('.filterlist').forEach(conti => {
            conti.style.display ='table-row'; 
        })
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
            //console.log(data)
            }        
        ))
            .catch(errors => {
                console.log(errors);
                if(errors.response.status===401){
                    this.props.history.push('/error401');
                    this.props.history.go();
                }
            })
    }


    render(){
        const{
            continent,
            country
          } = this.state   

        return(

            <div className="pictures-nav">
                <h3>Filtrer :</h3>
                <div className="input-box">
                    <label htmlFor="continent">Continent</label>
                    <select name="continent" id="continent" value={continent} onChange={this.handleChange}>
                        <option value="" >--sélectionner--</option> 
                        {this.state.continents.map((continent, index) => 
                            <option value={continent._id} key = {index} name ={continent.name} >{continent.name}</option> 
                        )}
                    </select>
                </div>

                <div className="input-box">
                    <label htmlFor="country">Country</label>
                    <select name="country" id="country" value={country} onChange={this.handleChange, this.handlefilter}>
                        <option value="" >--sélectionner--</option> 
                        {this.state.countries.filter(country => country.continent._id === continent).map((country, index) => 
                            <option value={country.name} key = {index}>{country.name}</option>     
                        )}
                    </select>
                </div>


                <button className="btn-link" onClick={this.reset}>Reset</button>
                
            </div>

        )
    }
}


export default Selection;