import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { PersonSuggestionService } from './../shared/person-suggestion.service';
import { PersonFormComponent } from '../../../people/person-form/person-form.component';
import { NotificationService } from './../../../utils/notification.service';
import { PersonSuggestion } from '../shared/person-suggestion.interface';

@Component({
  selector: 'app-person-suggestion-create',
  templateUrl: './person-suggestion-create.component.html',
  styleUrls: ['./person-suggestion-create.component.css']
})
export class PersonSuggestionCreateComponent implements OnInit {
  title = 'Create Suggestion';
  @ViewChild(PersonFormComponent) personFormComp: PersonFormComponent;

  constructor(
    private service: PersonSuggestionService,
    private loc: Location,
    private notification: NotificationService) { }

  ngOnInit() {
  }

  addPersonSuggestion() {
    if (this.personFormComp.form.valid) {
      const newSuggestion: PersonSuggestion = this.personFormComp.form.value;
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
