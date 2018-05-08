import { Observable } from 'rxjs/Observable';
import { NotificationDialogComponent } from './../../../utils/notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PersonSuggestionService } from '../shared/person-suggestion.service';
import { NotificationService } from '../../../utils/notification.service';
import { PersonSuggestion } from '../shared/person-suggestion.interface';
import { PersonFormComponent } from '../../../people/person-form/person-form.component';
import { Subscription } from 'rxjs/Subscription';
import { PersonSuggestionPut } from '../shared/person-suggestion-put.interface';

@Component({
  selector: 'app-person-suggestion-edit',
  templateUrl: './person-suggestion-edit.component.html',
  styleUrls: ['./person-suggestion-edit.component.css']
})
export class PersonSuggestionEditComponent implements OnInit, OnDestroy {

  title = 'Edit Suggestion';
  id: string;
  person: PersonSuggestion;
  subscription: Subscription;
  @ViewChild(PersonFormComponent) personFormComp;

  constructor(
    private service: PersonSuggestionService,
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

  getSuggestion() {
    this.subscription = this.service.getSuggestion(this.id)
      .subscribe((suggestion) => this.person = suggestion);
  }

  saveChanges() {
    if (this.personFormComp.form.valid && (Number(this.personFormComp.id.value) === Number(this.id))) {
      this.openDialog().afterClosed().subscribe(result => {
        if (result) {
          const oldPerson = this.person;
          const newPerson = this.personFormComp.form.value;
          const putSuggestion: PersonSuggestionPut = {
            oldPerson: oldPerson,
            newPerson: newPerson
          };
          this.subscription = this.service.editSuggestion(putSuggestion)
            .subscribe(() => {
              this.notification.notificationSubject.next('Changes saved');
              this.goBack();
            }
          );
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

  goBack() {
    this.router.navigate(['/suggestions/people']);
  }
}
