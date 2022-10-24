const LOCATION_TYPE = {
    GPS: 1,
    ADDRESS: 2,
    BUILDING: 3,
}

class Location {
    data: string | any;
    type: number;
    constructor(data: string | any, type: number = 1) {
        this.data = data
        this.type = type
    }
}

export {
    LOCATION_TYPE,
    Location
}
