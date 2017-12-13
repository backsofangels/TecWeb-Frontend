import { Component, OnInit } from '@angular/core';
import {AuthService} from '../AuthService';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private markerClicked: boolean;

  constructor() { }

  ngOnInit() {
    this.clickedMarker(6);
  }

    clickedMarker(ID: number) {
      if (ID > 5) {
        this.markerClicked = true;
      } else {
        this.markerClicked = false;
      }
    }
}
