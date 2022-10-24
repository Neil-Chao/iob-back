const LOCATION_TYPE = {
    GPS: "GPS",
    ADDRESS: "ADDRESS",
    BUILDING: "BUILDING",
}

class Location {
    constructor(data, type="gps") {
        this.data = data
        this.type = type
    }
}

export default {
    LOCATION_TYPE,
    Location
}
