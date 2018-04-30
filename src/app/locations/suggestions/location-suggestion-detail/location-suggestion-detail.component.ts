import { DTUFloors } from './../../shared/floors';
import { LocationService } from './../../shared/location.service';
import { DTULocation } from './../../shared/location.interface';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { LocationSuggestion } from './../shared/location-suggestion.interface';
import { LocationSuggestionService } from '../shared/location-suggestion.service';

@Component({
  selector: 'app-location-suggestion-detail',
  templateUrl: './location-suggestion-detail.component.html',
  styleUrls: ['./location-suggestion-detail.component.css']
})
export class LocationSuggestionDetailComponent implements OnInit {

  @Input() suggestion: LocationSuggestion;
  @Input() location: DTULocation;
  floors = DTUFloors;

  constructor(
    private service: LocationSuggestionService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private loc: Location) { }

  ngOnInit() {
    this.getSuggestion();
  }

  getSuggestion() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getSuggestion(id)
      .subscribe(suggestion => {
        this.suggestion = suggestion;
        this.getLocation();
      });
  }

  getLocation() {
    this.locationService.getLocation(this.suggestion.location.id)
      .subscribe(location => this.location = location);
  }

  approveSuggestion() {
  }

  goBack() {
    this.loc.back();
  }

}
