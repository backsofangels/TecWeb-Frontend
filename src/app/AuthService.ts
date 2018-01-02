import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from './model/user.model';
import 'rxjs/add/operator/do';
import "rxjs/add/operator/map";
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
            console.log(value.toString());
            console.log(value);
            this.setSession(value);
        });
    }

    average(drillID: number, beginDate: Date, endDate: Date) {
        let params = new HttpParams()
            .set("identifier", drillID.toString())
            .set("beginDate", beginDate.toLocaleDateString())
            .set("endDate", endDate.toLocaleDateString());
        return this.http.get('get/drill/average', {params})
    }

    update(drillID: number, firstName: string, lastName: string, email: string, password: string) {
        const body = JSON.stringify({
            firstName: firstName, lastName: lastName, email: email,
            pwd: password, favoriteDrill: drillID
        });
        return this.http.put('update', body).do(() => this.setSession);
    }

    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('id_token');
        //    localStorage.removeItem("expires_at");
    }

    public isLoggedIn(): boolean {
        const token = localStorage.getItem('id_token');
        return tokenNotExpired(token);
    }

    /*
        isLoggedOut(): boolean {
            return !this.isLoggedIn();
        }

         getExpiration() {
             const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
             return moment(expiresAt);
         }   */

    public setSession(jwt: string): void {
        console.log("set Session");
        let jwtHelper: JwtHelper = new JwtHelper();
        console.log(jwt);
        const decoded = jwtHelper.decodeToken(jwt);
        console.log(decoded);
        console.log(decoded.toString());
        localStorage.setItem('user',
            JSON.stringify(new User(decoded.identifier, decoded.firstName, decoded.lastName, decoded.favoriteDrill, decoded.email)));
        localStorage.setItem('id_token', jwt);
        //   localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }
}
