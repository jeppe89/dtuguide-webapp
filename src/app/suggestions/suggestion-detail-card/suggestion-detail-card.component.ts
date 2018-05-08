import { DTUFloors } from './../../locations/shared/floors';
import { DTULocation } from './../../locations/shared/location.interface';
import { Component, OnInit, Input } from '@angular/core';
import { LocationSuggestion } from '../locations/shared/location-suggestion.interface';

@Component({
  selector: 'app-suggestion-detail-card',
  templateUrl: './suggestion-detail-card.component.html',
  styleUrls: ['./suggestion-detail-card.component.css']
})
export class SuggestionDetailCardComponent implements OnInit {
  @Input() location: LocationSuggestion;
  floors = DTUFloors;
  tags;

  constructor() { }

  ngOnInit() {
    this.tags = this.location.tags ? this.location.tags : null;
  }

}
