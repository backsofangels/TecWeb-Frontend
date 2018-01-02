import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from "../AuthService";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    private auth: AuthService = new AuthService(this.http);
    private updateOk: boolean = false;
    private errorUpdate: boolean = false;

    constructor(private http: HttpClient) {
  }

  email: string;
  password: string;

  onSubmit(form: NgForm) {
    if (form.valid) {
        let drillID = JSON.parse(localStorage.getItem('user')).favoriteDrill;
        let firstName = JSON.parse(localStorage.getItem('user')).firstName;
        let lastName = JSON.parse(localStorage.getItem('user')).lastName;
        console.log(form.value);
        const body = JSON.stringify({
            firstName: firstName, lastName: lastName, email: form.value.email,
            pwd: form.value.pwd, favoriteDrill: drillID
        });
        this.auth.update(body)
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
