class Location {
    constructor(data, type="gps") {
        this.data = data
        this.type = type
    }


}

const location = new Location("123")
console.log(location.data)