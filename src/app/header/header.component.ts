import {Component, OnInit} from '@angular/core';
import {AuthService} from '../AuthService';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    private auth: AuthService = new AuthService(this.http, this.cookieService);
    private userLogged = false;

    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
      // Questa sottoscrizione ci serve per sapere i cambiamenti sullo stato dell'utente (loggato oppure no)
      console.log('ngOnInit() header');
      /*this.auth.getLoggedInStatus.subscribe((status) => {
          console.log('Status ' + status);
          this.userLogged = status;
      });*/
      this.userLogged = this.auth.isLoggedIn();
      console.log(this.userLogged);
  }

  logOut() {
      console.log('in logout');
      this.auth.logout();
      this.userLogged = this.auth.isLoggedIn();
      // this.router.navigateByUrl('/');
      window.location.href = 'http://188.226.186.60';
  }
}
