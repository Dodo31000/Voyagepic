import React from 'react';
import '../scss/contact.scss';

class SimpleContact extends React.Component{


    render(){
        return(
        <div className="contact">
        
            <div className="contact-container">

                <i className="fab fa-telegram-plane fa-3x"></i>
                <h1> Contact </h1>
                
                <div className="sub-contact">
                    
                    <p>Vous souhaitez me laisser un message ? Rien de plus simple, pour cela  vous pouvez m'écrire à l'adresse suivante :</p><br/>
                    
                    <a href="mailto:voyagepic.website@gmail.com">voyagepic.website@gmail.com<hr/></a>
                    

                </div>
            </div>
        </div>
        )
    }
}

export default SimpleContact;