import React, {useState} from 'react';
import { Fragment } from 'react';
import { Link } from "react-router-dom";


const PictureTable = ({pictures}) =>{
    ///const [pictures] = useState([]);
    return(
    <Fragment>      
        
        <table>
            <tbody>
                <tr>
                    <th>Pays</th>
                    <th>Continent</th>
                    <th>Name</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Location</th>
                    <th>Legend</th>
                    <th>Picture</th>
                </tr>               

            {pictures.map((picture, index) => 
                <tr key = {index} className = "filterlist">
                    <td>{picture.country.name}</td>
                    <td>{picture.continent.name}</td>
                    <td>{picture.name}</td>
                    <td>{picture.lat}</td>
                    <td>{picture.long}</td>
                    <td>{picture.location}</td>
                    <td>{picture.legend}</td>
                    <td><img src={picture.imageUrl} alt="" width="100%"/></td>
    
                    <td>
                        <Link to={`/admin/pictures/edit/${picture._id}`}>
                            <button className="btn-modify" >Modifier</button>
                        </Link>
                    </td>
                </tr> 
            )}
            </tbody>
        </table>

        </Fragment>
    )  
}



export default PictureTable;