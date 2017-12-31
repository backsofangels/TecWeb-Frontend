import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../AuthService';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
    private auth: AuthService = new AuthService(this.http);

//    private errorLogin: boolean;

    constructor(private http: HttpClient, private router: Router) {
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
