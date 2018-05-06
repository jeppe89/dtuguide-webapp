import { SearchData } from './../../utils/search-data.interface';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { DTUFloors } from './../shared/floors';
import { LocationService } from './../shared/location.service';
import { DTULocation } from './../shared/location.interface';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  floors = DTUFloors;
  searchData$: Observable<SearchData>;

  constructor(private service: LocationService,
    private route: ActivatedRoute,
    private loc: Location) { }

  ngOnInit() {
    this.getLocation();
  }

  getLocation(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.searchData$ = this.service.getLocation(id);
  }

  goBack() {
    this.loc.back();
  }

}
