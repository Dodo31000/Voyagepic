import React from 'react';
import {continents} from './DestinationList';
import { Link } from "react-router-dom";
  
const CountriesSelection = ({handleWeel, ContinentValue }) => (
    <div id = "country-selection" onWheel = {handleWeel} > 
        <div className = "sub-country-selection" >

        {continents.list.filter(continent => continent.name === ContinentValue).map(continent=>(
            continent.countries.map((country, index)=>(
                
                <Link key = {index} to={`/Gallery/${continent.name}/${country.name}`}>
                <figure>
                    <figcaption className = {country.name} >{country.name}</figcaption>

                    <p className = {country.name} >Explorer  &#10095;</p>

                    <img 
                        className = {country.name} 
                        src={`img/${continent.name}/${country.name}/${country.name}_1.jpg`} 
                        alt={`${country.name}_1`} 
                        width="100%"
                    />

                </figure> 
                </Link>
            ))
        ))}
        </div>
    </div>
)

export default CountriesSelection;