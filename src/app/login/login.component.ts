import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
    form: FormGroup;
    email: String;
    password: String;
    private auth: AuthService = new AuthService(this.http);
    private errorLogin: boolean;

    onSubmit(form: NgForm) {
        if (form.valid) {
            console.log(form.value);
            this.login();
            // ...our form is valid, we can submit the data
        }
    }

    constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
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
                        this.router.navigateByUrl('/');
                    },
                    (error) => {
                        console.log('User log failed');
                        console.log(error);
                        this.errorLogin = true;
                    }
                );
        }
    }
}
