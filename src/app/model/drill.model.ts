export class Drill {
    drillIdentifier: number;
    lat: number;
    lng: number;

    constructor(drillID: number, lat: number, lng: number) {
        this.drillIdentifier = drillID;
        this.lat = lat;
        this.lng = lng;
    }
}