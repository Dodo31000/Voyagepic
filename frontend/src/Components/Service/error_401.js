import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../../scss/db_liste.scss';

class Error401 extends Component{

render(){
        return(

            <div className="db error">
                <div className="db-container">  
                    <div className="sub-db">

                    <h1>ERREUR 401</h1>
                    <h2>Vous n'êtes pas autorisé à accéder à ce contenu</h2>
                    <br/>

                    <figure>
                        <img src="/img/undraw_authentication_fsn5.png" alt="unauthorised" width=" 100%"/>
                    </figure>
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


export default Error401;