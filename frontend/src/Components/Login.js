import React , { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},          // Store error data from the backend here
            isAuthorized: false, // If auth is successful, set this to `true`
            isLoading: false,    
            token: null,        
          };
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);

      }

      handleChange(event){
        const name = event.target.name
        this.setState({
            [name]: event.target.value
        });
    }

      handleSubmit(e){
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
          };
          

    /*axios.post('/api/auth/signup', { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })*/

          //const token = JSON.parse(sessionStorage.getItem('data'));
            //const token = user.data.id; /*take only token and save in token variable*/

        const token = Buffer.from(`${this.state.username}:${this.state.pwd}`, 'utf8').toString('base64')

        /*'Content-Type': 'application/json', 'Token': localStorage.getItem("token"), Authorization: `Bearer ${token}`*/

       

    axios.post('/api/auth/login', user, 
        /*{ headers: authHeader() }*/
        {headers: { 
           'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}`},
        } 
       /* {headers: {
            'Content-Type': 'application/json',
            'Device': 'device',
            'Token': localStorage.getItem("token")
        }}*/
        /*{headers: {
            'Authorization': `Bearer ${JSON.parse(value).access_token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }}*/
        )
        /*.then((response) => {
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
    
            return response.data;
      })*/
    .then(response =>{
        this.setState({isLoading: false, isAuthorized: true});
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(token);
        this.props.history.push('/continents');
        this.props.history.go();
    })
    /*.then(res => {
        console.log(res);
        console.log(res.data);
      })*/
    .catch(error => {
        console.log(error && error.response);
        this.setState({errors: error.response.data, isLoading: false})
    });
      
       //this.props.history.push('/continents');
       //this.props.history.go();

        }

      render(){
        const { email, password } = this.state
    
    return (

        <div className="db">
                <div className="db-container">  
                    <div className="sub-db">

                        <form className = "modal" methode="POST" onSubmit={this.handleSubmit}> 
                            <h2>Se connecter</h2>

                            <div className="input-box">
                                <label htmlFor="username">Identifiant</label>
                                <input type="email" name="email" value={email} onChange={this.handleChange} required/>
                            </div>

                            <div className="input-box">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" value={password} onChange={this.handleChange} required/>
                            </div>

                            <button className="btn-modify">Sign in</button>
                        </form>

                        <div className = "buttons">
                            <Link to="/">
                                <button><span>&#10094;</span> Retour</button>
                            </Link>
                        </div> 

                    </div>
                </div>
            </div>

      );
    }
}


export default Login;