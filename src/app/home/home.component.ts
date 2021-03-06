import {Component, OnInit} from '@angular/core';
import {AuthService} from '../AuthService';
import {HttpClient} from '@angular/common/http';
import {Drill} from '../model/drill.model';
import {Measurement} from '../model/measurement.model';
import {Pollutant} from '../model/pollutant.model';
import {NgForm} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {Average} from '../model/average.model';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

    private markers: Drill[] = [];      // In Questo array si devono inserire tutte le coordinate dei drill da mostrare
    private markerID: number;
    private markerFavorities: number;
    private sondaAdded: boolean;
    private sondaRemoved: boolean;
    private markerClicked: boolean;     // Lo uso per far vedere la div a destra quando si clicca su un Drill
    private auth: AuthService = new AuthService(this.http, this.cookieService);
    private measure: Measurement[];    // In Questo array si devono inserire tutte le misure dei drill da mostrare
    // Valori utilizzati per settare il Datepicker
    currentDate = new Date();
    private userLogged: boolean;
    mindate = new Date(2017, 11, 31);
    mindatefrom: Date;
    datefrom: Date;

    addEvent(event: MatDatepickerInputEvent<Date>) {
        this.mindatefrom = new Date(event.value.getFullYear(),
            event.value.getMonth(), event.value.getDate() + 1);
    }

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

    ngOnInit() {
        this.auth.getDrills().subscribe(data => {
            for (let i in data) {   // Inserisco in markers[] le sonde prese dal database
                this.markers.push(new Drill(data[i].drillID, data[i].xCoordinate, data[i].yCoordinate));
            }
        });
        if (this.auth.isLoggedIn() === true) {
            this.userLogged = true;
            this.clickedMarker(JSON.parse(localStorage.getItem('user')).favoriteDrill);
        }
    }

    clickedMarker(ID: number) {
        this.measure = [];
        console.log('clicked the marker ' + ID);
        this.auth.getMeasurements(ID).subscribe(data => {
            for (let i in data) {   // Inserisco in measure[] le misure prese dal database
                this.measure.push(new Measurement(new Pollutant(data[i].pollutantMonitored.pollutantID, data[i].pollutantMonitored.pollutantName,
                    data[i].pollutantMonitored.maximumThreshold), data[i].quantityMeasured, data[i].measurementDate));
            }
        });
        this.markerClicked = true;
        this.markerID = ID;
    }

    addFavorities(ID: number) {
        this.sondaAdded = true;
        this.sondaRemoved = false;
        this.markerFavorities = ID;

        //  Aggiorno il database con la nuova sonda
        let firstName = JSON.parse(localStorage.getItem('user')).firstName;
        let lastName = JSON.parse(localStorage.getItem('user')).lastName;
        let email = JSON.parse(localStorage.getItem('user')).email;

        this.auth.update(ID, firstName, lastName, email)
            .subscribe(
                () => {
                    console.log('Drill updated successfully');
                },
                (error) => {
                    console.log('Update failed');
                    console.log(error);
                }
            );
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            this.auth.average(this.markerID, form.value.datefrom, form.value.dateto)
                .subscribe(
                    (data: Average) => {
                        console.log('Average successful');
                        this.measure = [];
                        for (let i in data.measurements) {   // Inserisco in measure[] le misure prese dal database
                            this.measure.push(new Measurement(new Pollutant(data.measurements[i].f1.pollutantID, data.measurements[i].f1.pollutantName,
                                data.measurements[i].f1.maximumThreshold), data.measurements[i].f2, data.maximumBoundary));
                        }
                    },
                    (error) => {
                        console.log('Average failed');
                        console.log(error);
                    }
                );
        }
    }
}
