import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from './model/user.model';
import 'rxjs/add/operator/do';
import {jwt} from 'jsonwebtoken';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string) {
        return this.http.post<User>('post/auth/login', {email, password})
            .do(() => this.setSession);
    }

    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('id_token');
        //    localStorage.removeItem("expires_at");
    }

    public isLoggedIn(): boolean {
        let loggedIn: boolean;
        this.http.get('get/auth/me').subscribe(() => {
            loggedIn = true;
        }, () => {
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

    private setSession(authResult): void {
        //    const expiresAt = moment().add(authResult.expiresIn, 'second');
        const decoded = jwt.decode(authResult.idToken);
        localStorage.setItem('user',
            JSON.stringify(new User(decoded.identifier, decoded.firstName, decoded.lastName, decoded.favoriteDrill, decoded.email)));
        localStorage.setItem('id_token', authResult.idToken);
        //   localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }
}
