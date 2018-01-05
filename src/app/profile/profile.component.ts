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

    constructor(private http: HttpClient, private cookieService: CookieService) { }

  email: string;
  password: string;

  // le variabili da riempire per visualizzare il contenuto nell'html
  private userInfos = JSON.parse(localStorage.getItem('user'));
  firstname: string = this.userInfos.firstName;
  lastname: string = this.userInfos.lastName;
  userEmail: string = this.userInfos.email;

  onSubmit(form: NgForm) {
    if (form.valid) {
        console.log(form.value.password);
        let parsed = JSON.parse(localStorage.getItem('user'));
        this.auth.update(parsed.favoriteDrill, parsed.firstName, parsed.lastName, parsed.email, form.value.password)
            .subscribe(
                () => {
                    console.log('Update successful');
                    this.updateOk = true;
                },
                (error) => {
                    console.log('Update failed');
                    console.log(error);
                }
            );
    }
  }

}
