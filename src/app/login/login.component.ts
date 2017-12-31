import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService';
import { HttpClient } from '@angular/common/http';
import { routes } from '../app-routing.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
    form: FormGroup;
    private auth: AuthService = new AuthService(this.http);
    private router: Router;
    private errorLogin: boolean;

    constructor(private fb: FormBuilder, private http: HttpClient) {

        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        const val = this.form.value;

        if (val.email && val.password) {
            this.auth.login(val.email, val.password)
                .subscribe(
                    () => {
                        console.log('User is logged in');
                        this.router.navigateByUrl('app-home');
                    },
                    () => {
                        console.log('User log failed');
                        this.errorLogin = true;
                    }
                );
        }
    }
}
