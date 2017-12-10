import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
//import { MomentModule } from 'angular2-moment';
import {User} from "./user";
import "rxjs/add/operator/do";
import {jwt} from "jsonwebtoken"

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string) {
        return this.http.post<User>('/auth/login', {email, password})
            .do(res => this.setSession);
    }

    logout(): void {
        localStorage.removeItem("user");
        localStorage.removeItem("id_token");
        //    localStorage.removeItem("expires_at");
    }

    public isLoggedIn(): boolean {
        let loggedIn: boolean;
        this.http.get("/auth/me").subscribe(res => {
            loggedIn = true;
        }, err => {
            loggedIn = false;
        });
        return loggedIn;

    }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    /* getExpiration() {
         const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
         return moment(expiresAt);
     }   */

    getlMeasurementsbyDrill(ID: number) {
        this.http.get('/drill/measurement/:' + ID).subscribe(data => {
            // Prendere l'arraylist e ritornarlo
        });
    }

    private setSession(authResult): void {
        //    const expiresAt = moment().add(authResult.expiresIn, 'second');
        const decoded = jwt.decode(authResult.idToken);
        localStorage.setItem('user', JSON.stringify(new User(decoded.identifier, decoded.firstName, decoded.lastName, decoded.favoriteDrill, decoded.email)));
        localStorage.setItem('id_token', authResult.idToken);
        //   localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }
}
