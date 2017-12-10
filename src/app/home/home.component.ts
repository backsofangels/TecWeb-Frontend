import {Component, OnInit} from '@angular/core';
import {AuthService} from "../AuthService";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    // In Questo array si devono inserire tutte le coordinate dei drill da mostrare
    markers: Drill[] = [
        {
            lat: 41.87194,
            lng: 12.56738,
            ID: 1
        },
        {
            lat: 41.87194,
            lng: 14.56738,
            ID: 2
        },
        {
            lat: 42.87194,
            lng: 13.56738,
            ID: 3
        }
    ];

    private markerClicked: boolean;     // Lo uso per far vedere la div a destra quando si clicca su un Drill
    private auth: AuthService = new AuthService(this.http);

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            const drillID = JSON.parse(localStorage.getItem('user')).favoriteDrill;
            this.clickedMarker(drillID);
        } else {
            this.http.get<Array<Drill>>("/api/get/drill/all").subscribe(data => {
                this.markers = data;    // Non sono sicuro funzioni perchè il backend ritorna una lista al posto di
            });                         // un array
        }
  }

    clickedMarker(ID: number) {
        this.auth.getlMeasurementsbyDrill(ID);
        this.markerClicked = true;
        console.log(`clicked the marker: ${ID}`)
    }

}

interface Drill {
    lat: number;
    lng: number;
    ID: number;
}