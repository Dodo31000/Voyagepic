import React from 'react';

function PictureForm({
    continents,
    countries,
    handleCancel,
    handleSubmit,
    handleDelete, 
    handleUrlChange,
    handleChange, 
    image_preview,
    nameValue,
    latValue,
    longValue,
    locationValue,
    legendValue,
    continentValue,
    countryValue,
    paramsId
}){
 
    return(
        <form className = "modal" methode="POST" onSubmit={handleSubmit}> 
            <h2>Ajouter une image</h2>

            <div className="input-box">
                <label htmlFor="url">Image Url</label>
                <input type="file" name="file" onChange={handleUrlChange}/>
                <div className="cancel-img" onClick={handleCancel}> &#10006;</div>
            </div>

            <img src={image_preview} alt="" width="100%"/>

            <div className="input-box">
                <label htmlFor="name">Image Name</label>
                <input type="text" name="picName" value={nameValue} onChange={handleChange} required/>
            </div>
            
            <div className="input-box">
                <label htmlFor="continent">Continent</label>
                <select name="continent" id="continent" value={continentValue} onChange={handleChange} required>
                    <option value="" >--sélectionner--</option> 
                    {continents.map((continent, index) => 
                        <option value={continent._id} key = {index}>{continent.name}</option> 
                    )}
                </select>
            </div>

            <div className="input-box">
                <label htmlFor="country">Country</label>
                <select name="country" id="country" value={countryValue} onChange={handleChange} required>
                    <option value="" >--sélectionner--</option> 
                    {countries.filter(country => country.continent._id === continentValue).map((country, index) => 
                        <option value={country._id} key = {index}>{country.name}</option> 
                    )}
                </select>
            </div>

            <div className="input-box">
                <label htmlFor="latitude">Latitude</label>
                <input type="number" name="lat" value={latValue} onChange={handleChange} required/> 
            </div>
            {/*<small>*Utiliser des virgules</small>*/}

            <div className="input-box">
                <label htmlFor="longitude">Longitude</label>
                <input type="number" name="long" value={longValue} onChange={handleChange} required/>
            </div>
            {/*<small>*Utiliser des virgules</small>*/}
            
            <div className="input-box">
                <label htmlFor="location">Location</label>
                <textarea name="location" value={locationValue} id="location" cols="50" rows="2" onChange={handleChange} required/>
            </div>

            <div className="input-box">
                <label htmlFor="legend">Légende</label>
                <textarea name="legend" value={legendValue} id="legend" cols="50" rows="2" onChange={handleChange}/>
            </div>

            <button className="btn-modify">Enregistrer</button>
            {paramsId ?
            <button className="btn-delete" onClick={handleDelete}>Supprimer</button>
            : ''
            }
            </form>
    )
}


export default PictureForm;