import React from 'react';

function ContryForm({
    continents,
    handleSubmit,
    handleDelete, 
    handleUrlChange,
    handleCancel,
    handleChange, 
    nameValue,
    latValue,
    longValue,
    descriptionValue,
    continentValue,
    image_preview,
    paramsId
}){
 
    return(
        <form className = "modal" methode="POST" onSubmit={handleSubmit}> 
            <h2>Ajouter un Pays</h2>

            <div className="input-box">
                <label htmlFor="country">Pays</label>
                <input type="text" name="name" value={nameValue} onChange={handleChange} required/>
            </div>

            <div className="input-box">
                <label htmlFor="url">Image Url</label>
                <input type="file" name="file" onChange={handleUrlChange}/>
                <div className="cancel-img" onClick={handleCancel}> &#10006;</div>
            </div>

            <img src={image_preview} alt="" width="100%"/>
            
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
                <label htmlFor="description">Description</label>
                <textarea name="description" value={descriptionValue} id="description" cols="50" rows="5" onChange={handleChange} required/>
            </div>

            <button className="btn-modify">Enregistrer</button>
            {paramsId ?
            <button className="btn-delete" onClick={handleDelete}>Supprimer</button>
            : ''
            }
            </form>
    )
}


export default ContryForm;