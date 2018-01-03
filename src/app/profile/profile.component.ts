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

  onSubmit(form: NgForm) {
    if (form.valid) {
        let parsed = JSON.parse(localStorage.getItem('user'));
        this.auth.update(parsed.favoriteDrill, parsed.firstName, parsed.lastName, form.value.email, form.value.password)
            .subscribe(
                () => {
                    console.log('Update successful');
                    this.updateOk = true;
                },
                (error) => {
                    this.errorUpdate = true;
                    console.log('Update failed');
                    console.log(error);
                }
            );
    }
  }

}
