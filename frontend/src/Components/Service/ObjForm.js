

export function ObjContinents({imageUrl, name}) {
  
    const objContinents = new FormData() 

    objContinents.append('file', imageUrl)
    objContinents.append('name', name)
    
}

export function ObjCountry() {
    
    const ObjCountry = new FormData()
    
    ObjCountry.append('file', this.state.imageUrl)
    ObjCountry.append('name', this.state.name)
    ObjCountry.append('continent', this.state.continent)
    ObjCountry.append('lat', this.state.lat)
    ObjCountry.append('long', this.state.long)
    ObjCountry.append('description', this.state.description)

}

export function ObjPicture() {
    
    const ObjPicture = new FormData() 
    
    ObjPicture.append('file', this.state.imageUrl)
    ObjPicture.append('name', this.state.picName)
    ObjPicture.append('continent', this.state.continent)
    ObjPicture.append('country', this.state.country)
    ObjPicture.append('lat', this.state.lat)
    ObjPicture.append('long', this.state.long)
    ObjPicture.append('location', this.state.location)
    ObjPicture.append('legend', this.state.legend)

}







