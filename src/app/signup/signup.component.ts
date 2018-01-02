import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgForm} from '@angular/forms';
import {Drill} from "../model/drill.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    private markers: Drill[] = [];      // In Questo array si devono inserire tutte le coordinate dei drill da mostrare
    private drillID: number = 0;
    private errorSignup: boolean = false;
    private signupOk: boolean = false;

    constructor(private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
        this.http.get("get/drill/all").subscribe(data => {
            for (let i in data) {   // Inserisco in markers[] le sonde prese dal database
                this.markers.push(new Drill(data[i].drillID, data[i].xCoordinate, data[i].yCoordinate));
            }
        });
    }

    addFavorities(ID: number) {
        console.log('clicked the marker ' + ID);
        this.drillID = ID;
    }

    // Bisogna inserire all'interno dei vari set i valori presi dal form
    onSubmit(form: NgForm) {
        if (form.valid && this.drillID) {
            const body = JSON.stringify({
                firstName: form.value.firstName, lastName: form.value.lastName, email: form.value.email,
                pwd: form.value.pwd, favoriteDrill: this.drillID
            });
            this.http.post('auth/signup', body, {responseType: 'text'}).subscribe(() => {
                this.signupOk = true;
                console.log("Signup Successful");
                setTimeout(() => {
                    this.router.navigateByUrl('/login')
                }, 3000)

            }, error => {
                this.errorSignup = true;
                console.log("Error signup");
                console.log(error);
            }
        );
    }
  }

}
