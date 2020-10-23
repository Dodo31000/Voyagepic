import React from 'react';

function ContinentForm({
    paramsId, 
    handleSubmit, 
    handleDelete, 
    handleChange, 
    handleUrlChange, 
    handleCancel, 
    nameValue, 
    image_preview,
})
{
    return(

            <form className = "modal" methode="POST" onSubmit={handleSubmit}> 
                <h2>Ajouter un Continent</h2>

                <div className="input-box">
                    <label htmlFor="continent">continent</label>
                    <input type="text" name="name" value={nameValue} onChange={handleChange} required/>
                </div>

                <div className="input-box">
                    <label htmlFor="url">Image Url</label>
                    <input type="file" name="file" onChange={handleUrlChange} required/>
                    <div className="cancel-img" onClick={handleCancel}> &#10006;</div>
                </div>

                <img src={image_preview} alt="" width="100%"/>
                
                <button className="btn-modify">Enregistrer</button>
                {paramsId ?
                <button className="btn-delete" onClick={handleDelete}>Supprimer</button>
                : ''
                }
            </form>

        )
    }

export default ContinentForm;