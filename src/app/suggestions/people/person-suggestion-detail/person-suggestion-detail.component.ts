import { AuthService } from './../../../auth/auth.service';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PersonSuggestion } from './../shared/person-suggestion.interface';
import { Person } from '../../../people/shared/person.interface';
import { PersonService } from './../../../people/shared/person.service';
import { PersonSuggestionService } from './../shared/person-suggestion.service';
import { NotificationService } from './../../../utils/notification.service';
import { SearchData } from './../../../utils/search-data.interface';
import { NotificationDialogComponent } from '../../../utils/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-person-suggestion-detail',
  templateUrl: './person-suggestion-detail.component.html',
  styleUrls: ['./person-suggestion-detail.component.css']
})
export class PersonSuggestionDetailComponent implements OnInit {
  title = 'Suggestion details';
  suggestion: PersonSuggestion;
  person: Person;

  constructor(
    private service: PersonSuggestionService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private loc: Location,
    private notification: NotificationService,
    private dialog: MatDialog,
    private auth: AuthService) { }

  ngOnInit() {
    this.getSuggestion();
  }

  isAdmin(): boolean {
    return this.auth.getSessionData().isAdmin;
  }

  getSuggestion() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getSuggestion(id).subscribe((suggestion: PersonSuggestion) => {
      this.suggestion = suggestion;
      this.getPerson(suggestion.name);
    });
  }
  getPerson(id) {
    this.personService.getPerson(id)
    .subscribe((searchData: SearchData) => this.person = searchData.data[0] as Person);
  }

  deleteSuggestion() {
    this.openDialog('Delete suggestion').afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteSuggestion(this.suggestion.suggestionID)
        .subscribe(() => {
          this.notification.notificationSubject.next('Suggestion was deleted');
          this.goBack();
        });
      }
    });
  }

  approveSuggestion() {
    this.openDialog('Approve suggestion').afterClosed().subscribe(result => {
      if (result) {
        this.service.approveSuggestion(this.suggestion.suggestionID)
      .subscribe(() => {
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
