import {Component, OnInit} from '@angular/core';
import {AuthService} from '../AuthService';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AgmCoreModule} from '@agm/core';
import { measurementByDrillId } from '../measurementbydrill.mockup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    private loggedUser: Boolean = true;
    // In Questo array si devono inserire tutte le coordinate dei drill da mostrare
    private markers: Drill[] = [
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
        },
    ];

    private markerID: number;
    private markerFavorities: number;
    private sondaAdded: boolean;
    private markerClicked: boolean;     // Lo uso per far vedere la div a destra quando si clicca su un Drill
    private auth: AuthService = new AuthService(this.http);

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            const drillID = JSON.parse(localStorage.getItem('user')).favoriteDrill;
            this.clickedMarker(drillID);
            this.loggedUser = true;
        } else {
            this.http.get<Array<Drill>>('/api/get/drill/all').subscribe(data => {
                this.markers = data;    // Non sono sicuro funzioni perchè il backend ritorna una lista al posto di
            });                         // un array
        }
  }

    clickedMarker(ID: number) {
        console.log(`clicked the marker: ${ID}`);
        this.auth.getMeasurementsbyDrill(ID);
        this.markerClicked = true;
        this.markerID = ID;
    }
    addFavorities(ID: number) {
        this.sondaAdded = true;
        this.markerFavorities = ID;
    }
    removeFavorities(ID: number) {
        this.sondaAdded = false;
        this.markerFavorities = -1;
    }
}

interface Drill {
    lat: number;
    lng: number;
    ID: number;
}
