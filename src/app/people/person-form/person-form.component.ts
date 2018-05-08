import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { PersonSuggestion } from '../../suggestions/people/shared/person-suggestion.interface';
import { Person } from '../../people/shared/person.interface';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  form: FormGroup;
  @Input() person: Person | PersonSuggestion;
  @Input() hideId: boolean;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder) {
    this.form = fb.group({
      id: ['', [
        Validators.required
      ]],
      name: ['', [
        Validators.required
      ]],
      mail: ['', [
        Validators.required
      ]],
      description: ['', [

      ]],
      picture: ['', [

      ]],
      role: ['', [
      ]],
      room: ['', [
      ]]
    });
  }

  ngOnInit() {
    let id = null;
    let room = null;
    if (this.person) {
      id = (this.person as Person).id ?
        (this.person as Person).id :
        (this.person as PersonSuggestion).suggestionID;
      room = (this.person as Person).id ?
        (this.person as Person).location.name :
        (this.person as PersonSuggestion).room;
    }

    this.form.setValue({
      id: this.person ? id : '',
      name: this.person ? this.person.name : '',
      mail: this.person ? this.person.mail : '',
      description: this.person ? this.person.description : '',
      picture: this.person ? this.person.picture : '',
      role: this.person ? this.person.role : '',
      room: this.person ? room : '',
    });

    if (this.hideId) {
      this.id.disable();
    }
  }

  get id() {
    return this.form.get('id');
  }

  get name() {
    return this.form.get('name');
  }

  get mail() {
    return this.form.get('mail');
  }

  get description() {
    return this.form.get('description');
  }

  get picture() {
    return this.form.get('picture');
  }

  get role() {
    return this.form.get('role');
  }

  get room() {
    return this.form.get('room');
  }
}
