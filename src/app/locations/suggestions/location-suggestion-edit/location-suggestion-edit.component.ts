import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LocationSuggestionService } from './../shared/location-suggestion.service';
import { LocationSuggestionFormComponent } from './../location-suggestion-form/location-suggestion-form.component';
import { LocationSuggestion } from './../shared/location-suggestion.interface';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-location-suggestion-edit',
  templateUrl: './location-suggestion-edit.component.html',
  styleUrls: ['./location-suggestion-edit.component.css']
})
export class LocationSuggestionEditComponent implements OnInit {

  title = 'Edit Suggestion';

  @Input() suggestion: LocationSuggestion;
  @ViewChild(LocationSuggestionFormComponent) locationSuggestionFormComp;

  constructor(
    private service: LocationSuggestionService,
    private route: ActivatedRoute,
    private loc: Location,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSuggestion();
  }

  getSuggestion(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getSuggestion(id)
      .subscribe(suggestion => this.suggestion = suggestion);
  }

  saveChanges(): void {
    this.snackBar.open('Yay snackbar', '', {
      duration: 2000,
    });
  }

}
