import {Component, OnInit} from '@angular/core';
import {AuthService} from '../AuthService';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AgmCoreModule} from '@agm/core';
import { measurementByDrillId } from '../measurementbydrill.mockup';
import { MockServerService } from '../services/server.services.mock';
import { HttpRequest } from 'selenium-webdriver/http';
import { Drill } from '../model/drill.model';
import { Average } from '../model/average.model';
import { Measurement } from '../model/measurement.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    private loggedUser: Boolean = true;
    // In Questo array si devono inserire tutte le coordinate dei drill da mostrare
    private markers: Drill[] = [];

    private markerID: number;
    private markerFavorities: number;
    private sondaAdded: boolean;
    private sondaRemoved: boolean;
    private markerClicked: boolean;     // Lo uso per far vedere la div a destra quando si clicca su un Drill
    private auth: AuthService = new AuthService(this.http);
    private mockedServer = new MockServerService();
    private measure: Measurement[] = [];
    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        // if (this.auth.isLoggedIn()) {
        //    const drillID = JSON.parse(localStorage.getItem('user')).favoriteDrill;
        //    this.clickedMarker(drillID);
        // } else {
        //     this.http.get("").subscribe(data => {
        //        this.markers.push(this.mockedServer.getDrill().body as Drill);    // Non sono sicuro funzioni perchè il backend ritorna una lista al posto di
        //     });                                                                   // un array
        // }
        console.log(this.mockedServer.getDrill().body as Drill[]);
        this.mockedServer.getDrill().body.forEach(element => {
            this.markers.push(element as Drill);
        });
        console.log(this.mockedServer.getMeasurementByDrill().body);
  }

    clickedMarker(ID: number) {
        console.log('clicked the marker ' + ID);
        // this.auth.getMeasurementsbyDrill(ID);
        this.mockedServer.getMeasurementByDrill(ID).body.forEach(element => {
            this.measure.push(element as Measurement);
            console.log(element as Measurement);
        });
        this.markerClicked = true;
        this.markerID = ID;
        console.log(this.measure);
    }

    // queste due funzioni effettuano l'update dell'utente con le preferenze aggiornate

    addFavorities(ID: number) {
        this.sondaAdded = true;
        this.sondaRemoved = false;
        this.markerFavorities = ID;
    }

    removeFavorities(ID: number) {
        this.sondaRemoved = true;
        this.sondaAdded = false;
        this.markerFavorities = -1;
    }
}
