import { SearchData } from './../../../utils/search-data.interface';
import { LocationService } from './../../../locations/shared/location.service';
import { DTULocation } from './../../../locations/shared/location.interface';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
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
export class LocationSuggestionCreateComponent implements OnInit, OnDestroy {

  title = 'Create Location Suggestion';
  subscription: Subscription;
  @ViewChild(LocationFormComponent) locationFormComp: LocationFormComponent;

  constructor(
    private service: LocationSuggestionService,
    private locationService: LocationService,
    private loc: Location,
    private notification: NotificationService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
  /*
  getLocation(name) {
    this.subscription = this.locationService.getLocation(name).subscribe((searchData: SearchData) => {
      this.location = searchData.data[0] as DTULocation;
      console.log(this.location);
    });
  }
  */

  goBack() {
    return this.loc.back();
  }

}
