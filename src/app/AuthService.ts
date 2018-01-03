import {HttpClient, HttpParams} from '@angular/common/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from './model/user.model';
import 'rxjs/add/operator/do';
import {JwtHelper, tokenNotExpired} from "angular2-jwt";
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

    // Utilizziamo questo evento per notificare l'header dello stato dell'utente (loggato oppure no)
    @Output() getLoggedInStatus: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    login(email: string, password: string) {
        return this.http.get('auth/login', {
            responseType: 'text',
            headers: {'Authorization': 'Basic ' + btoa(email + ':' + password)}
        }).do(() => {
            const value: string = this.cookieService.get('jwt');
            this.setSession(value);
        });
    }

    signup(firstName: string, lastName: string, email: string, password: string, drillID: number) {
        const body = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            pwd: password,
            favoriteDrill: drillID
        });
        return this.http.post('auth/signup', body, {responseType: 'text'});
    }

    getDrills() {
        return this.http.get("get/drill/all");
    }

    getMeasurements(ID: number) {
        return this.http.get('get/drill/measurement/' + ID);
    }

    average(drillID: number, beginDate: Date, endDate: Date) {
        let params = new HttpParams()
            .set('identifier', drillID.toString())
            .set('beginDate', beginDate.toLocaleDateString())
            .set('endDate', endDate.toLocaleDateString());
        return this.http.get('get/drill/average', {params});
    }

    update(drillID: number, firstName: string, lastName: string, email: string, password: string) {
        const body = JSON.stringify({
            firstName: firstName, lastName: lastName, email: email,
            pwd: password, favoriteDrill: drillID
        });
        return this.http.put('auth/update', body, {
            responseType: 'text',
            headers: {'Content-Type': 'application/json'}
        }).do(() => {
            const value: string = this.cookieService.get('jwt');
            this.setSession(value);
        });
    }

    updateFavorite(drillID: number, firstName: string, lastName: string, email: string) {
        const body = JSON.stringify({firstName: firstName, lastName: lastName, email: email, favoriteDrill: drillID});
        console.log('body is ' + body);
        return this.http.put('auth/update', body, {
            responseType: 'text',
            headers: {'Content-Type': 'application/json'}
        }).do(() => {
            const value: string = this.cookieService.get('jwt');
            this.setSession(value);
        });
    }

    clearLocalStorage(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('id_token');
    }

    logout(): void {
        console.log('In logout()');
        localStorage.clear();
    }

    public isLoggedIn(): boolean {
        if (tokenNotExpired('id_token')) {
            this.getLoggedInStatus.emit(true);
            return true;
        } else {
            this.getLoggedInStatus.emit(false);
            return false;
        }
    }

    /*
         getExpiration() {
             const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
             return moment(expiresAt);
         }   */

    public setSession(jwt: string): void {
        let jwtHelper: JwtHelper = new JwtHelper();
        const decoded = jwtHelper.decodeToken(jwt);
        localStorage.setItem('user',
            JSON.stringify(new User(decoded.identifier, decoded.firstName, decoded.lastName, decoded.email, decoded.favoriteDrill)));
        localStorage.setItem('id_token', jwt);
    }
}
