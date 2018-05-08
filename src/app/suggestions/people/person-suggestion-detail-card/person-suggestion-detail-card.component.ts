import { PersonSuggestion } from './../shared/person-suggestion.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-person-suggestion-detail-card',
  templateUrl: './person-suggestion-detail-card.component.html',
  styleUrls: ['./person-suggestion-detail-card.component.css']
})
export class PersonSuggestionDetailCardComponent implements OnInit {
  @Input() person: PersonSuggestion;
  constructor() { }

  ngOnInit() {
  }

}
