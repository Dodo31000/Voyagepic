

export function ObjContinents(imageUrl, name) {
  
    const objContinents = new FormData() 

    objContinents.append('file', imageUrl)
    objContinents.append('name', name)
    
}

export function CountryData() {
    
    const CountryData = new FormData()
    
    CountryData.append('file', this.state.imageUrl)
    CountryData.append('name', this.state.name)
    CountryData.append('continent', this.state.continent)
    CountryData.append('lat', this.state.lat)
    CountryData.append('long', this.state.long)
    CountryData.append('description', this.state.description)

}

export function pictureData() {
    
    const pictureData = new FormData() 
    
    pictureData.append('file', this.state.imageUrl)
    pictureData.append('name', this.state.picName)
    pictureData.append('continent', this.state.continent)
    pictureData.append('country', this.state.country)
    pictureData.append('lat', this.state.lat)
    pictureData.append('long', this.state.long)
    pictureData.append('location', this.state.location)
    pictureData.append('legend', this.state.legend)

}







