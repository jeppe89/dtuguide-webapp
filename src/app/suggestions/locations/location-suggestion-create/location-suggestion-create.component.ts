import { NotificationService } from './../../../utils/notification.service';
import { Subscription } from 'rxjs/Subscription';
import { LocationSuggestion } from './../shared/location-suggestion.interface';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { LocationSuggestionService } from './../shared/location-suggestion.service';
import { LocationFormComponent } from '../../../locations/location-form/location-form.component';

@Component({
  selector: 'app-location-suggestion-create',
  templateUrl: './location-suggestion-create.component.html',
  styleUrls: ['./location-suggestion-create.component.css']
})
export class LocationSuggestionCreateComponent implements OnInit {

  title = 'Create Location';
  @ViewChild(LocationFormComponent) locationFormComp: LocationFormComponent;

  constructor(
    private service: LocationSuggestionService,
    private loc: Location,
    private notification: NotificationService) { }

  ngOnInit() {
  }

  addLocationSuggestion() {
    if (this.locationFormComp.form.valid) {
      const newSuggestion: LocationSuggestion = this.locationFormComp.form.value;
      this.service.addSuggestion(newSuggestion).subscribe(() => {
        this.notification.notificationSubject.next('Suggestion for ' + newSuggestion.name + ' was added');
        this.goBack();
      });
    }
  }

  goBack() {
    return this.loc.back();
  }

}
