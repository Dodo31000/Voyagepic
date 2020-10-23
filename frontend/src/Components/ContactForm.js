import React from 'react';
import '../scss/contact.scss';
import axios from 'axios';

class Contact extends React.Component{
  
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: '',
        message: '',
        errors: {}
      }
    }

    handleValidation(){
      let errors = {};
      let formIsValid = true;
      const {name, email, message} = this.state;

      //Name
      if(!name){
         formIsValid = false;
         errors.name = "Le Nom et Prénom ne peut pas être vide.";
      }

      if(name !== ''){
         if(!name.match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            errors.name = "Votre Prénom et Nom ne peuvent comporter que des lettres";
         }        
      }

      //Email
      if(!email){
         formIsValid = false;
         errors.email = "L'Email ne peut pas être vide.";
      }

      if(email !==  ''){
         let lastAtPos = email.lastIndexOf('@');
         let lastDotPos = email.lastIndexOf('.');

         if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
            formIsValid = false;
            errors.email = "l'Email n'est pas valide.";
          }
     }
     
     //Message
     if(!message){
      formIsValid = false;
      errors.message = "Le message ne peut pas être vide.";
   }


     this.setState({errors: errors});
     return formIsValid;
 }

    handleSubmit(e){
        e.preventDefault();
      
        if(this.handleValidation()){
        axios({
          method: "POST", 
          url:"http://localhost:3002/send", 
          data:  this.state
        }).then((response)=>{

          if (response.data.status === 'success'){
            alert("Message Envoyé."); 
            this.resetForm()
          }

          else if(response.data.status === 'fail') {
            alert("Echec de l'envoie du message.")
          }
        })
      }
      else {
        alert("Le formulaire contient des erreurs.")
      }
    }
    
      resetForm(){   
        this.setState({name: '', email: '', message: ''})
     }
    
     onNameChange(event) {
      this.setState({name: event.target.value})
    }
    
      onEmailChange(event) {
        this.setState({email: event.target.value})
      }
    
      onMessageChange(event) {
        this.setState({message: event.target.value})
      }

    render(){
        return(
        <div className="contact">
        
            <div className="contact-container">

                <i className="fab fa-telegram-plane fa-3x"></i>
                <h1> Contact </h1>
                
                <div className="sub-contact">
                    
                    <p>Vous souhaitez me laisser un message ? Rien de plus simple, pour cela  vous pouvez compléter ce formulaire.</p><br/>
                    
                    <form method="POST" onSubmit={this.handleSubmit.bind(this)}>
                        <div className = "form-content">
                              <div>
                                <p><label>Prénom et Nom<small>*</small></label></p>
                                <div>
                                  <p><input type="text" name="Nom" value={this.state.name} onChange={this.onNameChange.bind(this)} placeholder=" ..." required/></p>
                                  <small style={{color: "red"}}>{this.state.errors.name}</small>
                                </div>                                
                              </div>

                              <div>
                                <p><label>Votre Email<small>*</small></label></p>
                                <div>
                                  <p><input type="email" name="Email" value={this.state.email} onChange={this.onEmailChange.bind(this)}  placeholder=" ..." required/></p>
                                  <small style={{color: "red"}}>{this.state.errors.email}</small>
                                </div>                                
                              </div>

                              <div>
                                <p><label>Votre Message<small>*</small></label></p>
                                <div>
                                  <p><textarea name="message" value={this.state.message} onChange={this.onMessageChange.bind(this)}  placeholder=" ..." rows="5" required></textarea></p>
                                  <small style={{color: "red"}}>{this.state.errors.message}</small>
                                </div>
                              </div>
                            </div>

                        <div className="form-buttons">
                            <input type = "submit" value = "Envoyer" onClick={this.handleSubmit.bind(this)}/>
                            <input type = "reset" value = "Supprimer" onClick={this.resetForm.bind(this)}/>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default Contact;