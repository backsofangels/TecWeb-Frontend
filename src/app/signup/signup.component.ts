import {Component} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

    private router: Router;

    constructor(private http: HttpClient) {
    }

    firstname: string;
    lastname: string;
    email: string;
    password: string;

    // Bisogna inserire all'interno dei vari set i valori presi dal form
    onSubmit(form: NgForm) {
        if (form.valid) {
            console.log(form.value);
            const params = new HttpParams()
            .set('firstName', 'this.firstname')
            .set('lastName', 'this.lastname')
            .set('email', 'this.email')
            .set('pwd', 'this.password')
            .set('favoriteDrill', '-1');
        this.http.post('signup', params).subscribe(() => {
                this.router.navigateByUrl('/login');
            }
        );
    }
  }

}
