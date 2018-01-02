import {Component, OnInit} from '@angular/core';
import {AuthService} from '../AuthService';
import {HttpClient} from '@angular/common/http';
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private markerClicked: boolean;
    private auth: AuthService = new AuthService(this.http, this.cookieService);
  private userLogged = true;

    constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  ngOnInit() {
      this.userLogged = this.auth.isLoggedIn();
  }

  clickedMarker(ID: number) {
    if (ID > 5) {
      this.markerClicked = true;
    } else {
      this.markerClicked = false;
    }
  }

  logOut() {
    this.userLogged = false;
  }
}
