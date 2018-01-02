import {Component, OnInit} from '@angular/core';
import {AuthService} from '../AuthService';
import {HttpClient} from '@angular/common/http';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    private auth: AuthService = new AuthService(this.http, this.cookieService);
  private userLogged = true;

    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
  }

  ngOnInit() {
      this.auth.getLoggedInStatus.subscribe((status) => this.userLogged = status);
  }

  logOut() {
      this.userLogged = false;
      this.auth.logout();
      this.router.navigateByUrl('/');
  }
}
