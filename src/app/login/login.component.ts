import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../AuthService';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
    private auth: AuthService = new AuthService(this.http, this.cookieService);

//    private errorLogin: boolean;

    constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            console.log(form.value);
            this.login(form);
            // ...our form is valid, we can submit the data
        }
    }

    login(form: NgForm) {
        this.auth.login(form.value.email, form.value.password)
            .subscribe(
                () => {
                    console.log('User is logged in');
                    //    const value: string = this.cookieService.get('jwt');
                    let i = this.cookieService.getAll();
                    for (let a in i) {
                        console.log(i[a]);
                    }
                    //     this.auth.setSession(value);
                    this.router.navigateByUrl('/');
                },
                (error) => {
                    console.log('User log failed');
                    console.log(error);
//                    this.errorLogin = true;
                }
            );
    }
}
