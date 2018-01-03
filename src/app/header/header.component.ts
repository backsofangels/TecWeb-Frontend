import {Component, OnInit} from '@angular/core';
import {AuthService} from '../AuthService';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    private auth: AuthService = new AuthService(this.http, this.cookieService);
    private userLogged = false;

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

  ngOnInit() {
      this.userLogged = this.auth.isLoggedIn();
  }

  logOut() {
      console.log('in logout');
      this.auth.logout();
      this.userLogged = this.auth.isLoggedIn();
      window.location.href = 'http://188.226.186.60';
  }
}
