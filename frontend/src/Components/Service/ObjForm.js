

export function ObjContinents({
    imageUrl, 
    name,
    }) {
  
    const objContinents = new FormData() 

    objContinents.append('file', imageUrl)
    objContinents.append('name', name)

    return objContinents
    
}

export function ObjCountry({
    imageUrl, 
    name,
    continent,
    lat,
    long,
    description,    
}) {
    
    const ObjCountry = new FormData()
    
    ObjCountry.append('file', imageUrl)
    ObjCountry.append('name', name)
    ObjCountry.append('continent', continent)
    ObjCountry.append('lat', lat)
    ObjCountry.append('long', long)
    ObjCountry.append('description', description)

}

export function ObjPicture({
    imageUrl, 
    continent,
    lat,
    long,
    picName,
    country,
    location,
    legend,    
}) {
    
    const ObjPicture = new FormData() 
    
    ObjPicture.append('file', imageUrl)
    ObjPicture.append('name', picName)
    ObjPicture.append('continent', continent)
    ObjPicture.append('country', country)
    ObjPicture.append('lat', lat)
    ObjPicture.append('long', long)
    ObjPicture.append('location', location)
    ObjPicture.append('legend', legend)

}







