import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from './model/user.model';
import 'rxjs/add/operator/do';
import {jwt} from 'jsonwebtoken';
import { HttpResponse } from 'selenium-webdriver/http';
import { decode } from 'punycode';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string) {
        return this.http.get('auth/login', {
            responseType: 'text',
            headers: {'Authorization': 'Basic ' + btoa(email + ':' + password)}
        }).do(() => this.setSession);
    }

    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('id_token');
        //    localStorage.removeItem("expires_at");
    }

    public isLoggedIn(): boolean {
        let loggedIn: boolean = false;
        if (localStorage.id_token) {     // Prima di fare richiesta al server verifico che ci sia il jwt
            this.http.get('auth/me').subscribe(() => {
                loggedIn = true;
            }, () => {
                loggedIn = false;
            });
        }
        return loggedIn;
    }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    /* getExpiration() {
         const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
         return moment(expiresAt);
     }   */

    private setSession(authResult): void {
        //    const expiresAt = moment().add(authResult.expiresIn, 'second');
        const decoded = jwt.decode(authResult.idToken);
        console.log(decode.toString());
        localStorage.setItem('user',
            JSON.stringify(new User(decoded.identifier, decoded.firstName, decoded.lastName, decoded.favoriteDrill, decoded.email)));
        localStorage.setItem('id_token', authResult.idToken);
        //   localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }
}
