import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from "../AuthService";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    private auth: AuthService = new AuthService(this.http, this.cookieService);
    private updateOk: boolean = false;
    private errorUpdate: boolean = false;

    constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  email: string;
  password: string;

  //le variabili da riempire per visualizzare il contenuto nell'html
  firstname: string;
  lastname: string;
  emailuser: string;

  onSubmit(form: NgForm) {
    if (form.valid) {
        let drillID = JSON.parse(localStorage.getItem('user')).favoriteDrill;
        let firstName = JSON.parse(localStorage.getItem('user')).firstName;
        let lastName = JSON.parse(localStorage.getItem('user')).lastName;
        this.auth.update(drillID, firstName, lastName, form.value.email, form.value.pwd)
            .subscribe(
                () => {
                    console.log('Update successful');
                    this.updateOk = true;
                },
                (error) => {
                    this.errorUpdate = true;
                    console.log('Update failed');
                    console.log(error);
//                    this.errorLogin = true;
                }
            );
      // ...our form is valid, we can submit the data
    }
  }
  ngOnInit() {
  }
}
