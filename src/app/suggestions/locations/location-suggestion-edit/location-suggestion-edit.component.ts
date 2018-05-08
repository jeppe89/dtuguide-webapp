import { NotificationService } from './../../../utils/notification.service';
import { LocationSuggestionPut } from './../shared/location-suggestion-put.interface';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { LocationSuggestionService } from './../shared/location-suggestion.service';
import { LocationSuggestion } from './../shared/location-suggestion.interface';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { LocationFormComponent } from '../../../locations/location-form/location-form.component';
import { NotificationDialogComponent } from '../../../utils/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-location-suggestion-edit',
  templateUrl: './location-suggestion-edit.component.html',
  styleUrls: ['./location-suggestion-edit.component.css']
})
export class LocationSuggestionEditComponent implements OnInit, OnDestroy {

  title = 'Edit Suggestion';
  subscription: Subscription;
  location: LocationSuggestion;
  id: string;
  // @Input() suggestion: LocationSuggestion;
  @ViewChild(LocationFormComponent) locationFormComp;

  constructor(
    private service: LocationSuggestionService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSuggestion();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getSuggestion(): void {
    this.subscription = this.service.getSuggestion(this.id).subscribe((suggestion) => {
      this.location = suggestion;
    });
  }

  saveChanges(): void {
    if (this.locationFormComp.form.valid && (Number(this.locationFormComp.id.value) === Number(this.id))) {
      this.openDialog().afterClosed().subscribe(result => {
        if (result) {
          const oldLocation = this.location;
          const newLocation = this.locationFormComp.form.value;
          const putSuggestion: LocationSuggestionPut = {
            oldLocation: oldLocation,
            newLocation: newLocation
          };
          this.subscription = this.service.editSuggestion(putSuggestion).subscribe(() => {
            this.goBack();
            this.notification.notificationSubject.next('Changes saved');
          });
        }
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      data: { title: 'Save changes' }
    });
    return dialogRef;
  }

  goBack(): void {
    this.router.navigate(['/suggestions/locations']);
  }

}
