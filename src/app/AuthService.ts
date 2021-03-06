import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from './model/user.model';
import 'rxjs/add/operator/do';
import {JwtHelper, tokenNotExpired} from "angular2-jwt";
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

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

    update(drillID: number, firstName: string, lastName: string, email: string, password?: string) {
        let body;
        if (password) {
            body = JSON.stringify({
                firstName: firstName, lastName: lastName, email: email,
                pwd: password, favoriteDrill: drillID
            });
        } else {
            body = JSON.stringify({firstName: firstName, lastName: lastName, email: email, favoriteDrill: drillID});
        }
        return this.http.put('auth/update', body, {
            responseType: 'text',
            headers: {'Content-Type': 'application/json'}
        }).do(() => {
            const value: string = this.cookieService.get('jwt');
            this.setSession(value);
        });
    }

    logout(): void {
        console.log('In logout()');
        localStorage.clear();
    }

    public isLoggedIn(): boolean {
        if (tokenNotExpired('id_token')) {
            return true;
        } else {
            return false;
        }
    }

    public setSession(jwt: string): void {
        let jwtHelper: JwtHelper = new JwtHelper();
        const decoded = jwtHelper.decodeToken(jwt);
        localStorage.setItem('user',
            JSON.stringify(new User(decoded.identifier, decoded.firstName, decoded.lastName, decoded.email, decoded.favoriteDrill)));
        localStorage.setItem('id_token', jwt);
    }
}
