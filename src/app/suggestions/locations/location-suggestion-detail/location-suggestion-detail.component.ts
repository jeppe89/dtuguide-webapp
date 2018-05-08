import { AuthService } from './../../../auth/auth.service';
import { MatDialog } from '@angular/material';
import { NotificationService } from './../../../utils/notification.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { LocationSuggestion } from './../shared/location-suggestion.interface';
import { LocationSuggestionService } from '../shared/location-suggestion.service';
import { DTULocation } from '../../../locations/shared/location.interface';
import { LocationService } from '../../../locations/shared/location.service';
import { NotificationDialogComponent } from '../../../utils/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-location-suggestion-detail',
  templateUrl: './location-suggestion-detail.component.html',
  styleUrls: ['./location-suggestion-detail.component.css']
})
export class LocationSuggestionDetailComponent implements OnInit {

  suggestion: LocationSuggestion;
  location: DTULocation;

  constructor(
    private service: LocationSuggestionService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private loc: Location,
    private notification: NotificationService,
    private dialog: MatDialog,
    private auth: AuthService) { }

  ngOnInit() {
    this.getSuggestion();
  }

  isAdmin() {
    return this.auth.getSessionData().isAdmin;
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
    this.locationService.getLocation(this.suggestion.name)
      .subscribe(searchData => {
        this.location = searchData.data[0] as DTULocation;
      });
  }

  deleteSuggestion() {
    this.openDialog('Delete suggestion').afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteSuggestion(this.suggestion.suggestionID).subscribe(() => {
          this.notification.notificationSubject.next('Suggestion was deleted');
          this.goBack();
        });
      }
    });
  }

  approveSuggestion() {
    this.openDialog('Approve suggestion').afterClosed().subscribe(result => {
      if (result) {
        this.service.approveSuggestion(this.suggestion.suggestionID).subscribe(() => {
          this.notification.notificationSubject.next('Suggestion was approved');
          this.goBack();
        });
      }
    });
  }

  openDialog(title) {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      data: { title: title }
    });
    return dialogRef;
  }

  goBack() {
    this.loc.back();
  }

}
