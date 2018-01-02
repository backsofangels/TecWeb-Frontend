import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from './model/user.model';
import 'rxjs/add/operator/do';
import {jwt} from 'jsonwebtoken';
import "rxjs/add/operator/map";
import {tokenNotExpired} from "angular2-jwt";

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string) {
        return this.http.get('auth/login', {
            responseType: 'text',
            headers: {'Authorization': 'Basic ' + btoa(email + ':' + password)}
        }).do((res) => {
            this.setSession(res);
        });
    }

    update(body: string) {
        return this.http.put('update', body).do(() => this.setSession);
    }

    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('id_token');
        //    localStorage.removeItem("expires_at");
    }

    public isLoggedIn(): boolean {
        const token = localStorage.getItem('id_token');
        console.log(token);
        return tokenNotExpired(token);
    }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    /* getExpiration() {
         const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
         return moment(expiresAt);
     }   */

    public setSession(authResult): void {
        console.log("set Session");
        const decoded = jwt.decode(authResult.idToken);
        console.log(decoded.toString());
        localStorage.setItem('user',
            JSON.stringify(new User(decoded.identifier, decoded.firstName, decoded.lastName, decoded.favoriteDrill, decoded.email)));
        localStorage.setItem('id_token', authResult.idToken);
        //   localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }
}
