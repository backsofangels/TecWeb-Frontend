import {Component, OnInit} from '@angular/core';
import {AuthService} from '../AuthService';
import {HttpClient} from '@angular/common/http';
import {Drill} from '../model/drill.model';
import {Measurement} from '../model/measurement.model';
import {Pollutant} from "../model/pollutant.model";
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

    currentDate = new Date();
    private markers: Drill[] = [];      // In Questo array si devono inserire tutte le coordinate dei drill da mostrare
    private markerID: number;
    private markerFavorities: number;
    private sondaAdded: boolean;
    private sondaRemoved: boolean;
    private markerClicked: boolean;     // Lo uso per far vedere la div a destra quando si clicca su un Drill
    private auth: AuthService = new AuthService(this.http);
    private measure: Measurement[];    // In Questo array si devono inserire tutte le misure dei drill da mostrare

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.http.get("get/drill/all").subscribe(data => {
            for (let i in data) {   // Inserisco in markers[] le sonde prese dal database
                this.markers.push(new Drill(data[i].drillID, data[i].xCoordinate, data[i].yCoordinate));
            }
        });
        if (this.auth.isLoggedIn()) {
            console.log("Utente dentro");
            let drillID;
            drillID = JSON.parse(localStorage.getItem('user')).favoriteDrill;
            this.clickedMarker(drillID);
        }
    }

    clickedMarker(ID: number) {
        this.measure = [];
        console.log('clicked the marker ' + ID);
        this.http.get('get/drill/measurement/' + ID).subscribe(data => {
            for (let i in data) {   // Inserisco in measure[] le misure prese dal database
                this.measure.push(new Measurement(new Pollutant(data[i].pollutantMonitored.pollutantID, data[i].pollutantMonitored.pollutantName,
                    data[i].pollutantMonitored.maximumThreshold), data[i].quantityMeasured, data[i].measurementDate));
            }
        });
        this.markerClicked = true;
        this.markerID = ID;
    }

    addFavorities(ID: number) {
        /*     let decoded = JSON.parse(localStorage.getItem('user'));
             let user = new User(decoded.identifier,decoded.firstName,decoded.lastName,decoded.email, ID);   */
        //Aggiornare il database con la nuova sonda
        this.sondaAdded = true;
        this.sondaRemoved = false;
        this.markerFavorities = ID;
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
        console.log(form.value);
        // ...our form is valid, we can submit the data
        }
    }
}
