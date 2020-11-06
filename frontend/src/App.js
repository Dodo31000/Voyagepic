import React , { Component } from 'react';
import Home from './Components/Home';
import Gallery from './Components/Gallery';
import Header from './Components/header';
import Introduce from './Components/Introduce';
import SimpleContact from './Components/SimpleContact';
import List from './Components/BDD/List';
import Edit from './Components/BDD/Edit';
import Login from './Components/Login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group"


class App extends Component{
  state={
      ContinentValue:"Asie",
      heightContainer:true,
      bottomFooter:true,
      flexDirection:true,
      backgroundColor:true,
      item: 'continents',
      continents: [],
      pictures:[],
      countries:[],
      isLoaded: false,
    }

  constructor(props) {
    super(props);
    this.openMenuClick = this.openMenuClick.bind(this);
  }

  openMenuClick(){
    var burgerMenu = document.getElementById("burger");
    var standarMenu = document.querySelector("header nav ul");
    burgerMenu.classList.toggle("open");
    standarMenu.classList.toggle("display-menu");
  }

  logOut(){
    localStorage.removeItem('user');
    //window.location.reload(false);
  }     


      
  render(){
    const{
      ContinentValue,
      flexDirection,
      item
    } = this.state
    
    return(
      <Router>
        <div className = "page-container">

          <Header 
          openMenuClick = {this.openMenuClick}
          item ={item}
          logOut = {this.logOut}
          />

          <div className="main-container" 
            style = { { flexDirection: `${flexDirection ? 'column' : 'row'}`} }
          >
          

            <Route render={({location})=> (                
              <TransitionGroup className="transition-group">
                <CSSTransition
                  key={location.key} {...location.state}
                  classNames="transition"
                  timeout={900}
                >
                  <Switch location={location}>
                    <Route exact path="/Gallery/:continentName/:countryName"  render={(props)=> 
                      <Gallery {...props} />
                      } 
                    />

                    <Route exact path="/login"  render={(props)=> 
                      <Login {...props}/> 
                    } 
                    />

                    <Route exact path="/:item"  render={(props)=> 
                      <List {...props}/> 
                    } 
                    />

                    <Route exact path="/:item/edit/:id"  render={(props)=> 
                      <Edit {...props}/> 
                    } 
                    />
                    
                    <Route exact path="/introduce"  render={()=> 
                      <Introduce /> 
                    } 
                    />

                    <Route exact path="/contact"  render={()=> 
                      <SimpleContact /> 
                    } 
                    />

                    <Route exact path ="/" render={()=> 
                      <Home />
                      } 
                    />
                  </Switch>

                </CSSTransition>
              </TransitionGroup>
              )} 
            />
            
          </div>

          <footer>
            <small>Designed by <a href="mailto:voyagepic.website@gmail.com">Doriane Chrétien</a> | Tous droits réservés | 2020<br/>Les images de ce site ne sont pas libres de droits et sont régies au droit français et au Code de la Propriété Intellectuelle.</small>
          </footer>

        </div>

      </Router>
    )
  }
}

export default App;