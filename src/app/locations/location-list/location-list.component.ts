import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DTULocation } from '../shared/location.interface';
import { LocationService } from './../shared/location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  locations$: Observable<DTULocation[]>;

  constructor(private service: LocationService) { }

  ngOnInit() {
    // this.suggestionsList();
    this.suggestionsList();
  }

  suggestionsList() {
    this.locations$ = this.service.getLocations();
  }
}
