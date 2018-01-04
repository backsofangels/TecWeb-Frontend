import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../AuthService';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
    private auth: AuthService = new AuthService(this.http, this.cookieService);
    private loginOK = false;
    private errorLogin = false;

    constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            localStorage.clear();
            this.login(form);
        }
    }

    login(form: NgForm) {
        this.auth.login(form.value.email, form.value.password)
            .subscribe(
                () => {
                    this.loginOK = true;
                    console.log('User is logged in');
                    setTimeout(() => {
                        window.location.href = 'http://188.226.186.60'
                    }, 2000);
                },
                (error) => {
                    this.errorLogin = true;
                    console.log('User log failed');
                    console.log(error);
                }
            );
    }
}
