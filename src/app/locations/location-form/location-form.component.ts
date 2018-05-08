import { Component, OnInit, Input, Inject, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DTUFloors } from '../../locations/shared/floors';
import { LocationSuggestion } from './../../suggestions/locations/shared/location-suggestion.interface';
import { DTULocation } from '../../locations/shared/location.interface';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit {

  form: FormGroup;
  floors: string[] = DTUFloors;
  @Input() location: DTULocation | LocationSuggestion;
  @Input() hideId: boolean;
  // Tags chip list
  separatorKeysCodes = [ENTER, COMMA];
  tags: string[] = [];
  nameReadOnly = false;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder) {
      this.form = fb.group({
        id: ['', [
          Validators.required
        ]],
        description: [
        ],
        floor: ['', [
          Validators.required
        ]],
        landmark: ['', [
          Validators.required
        ]],
        name: ['', [
          Validators.required,
          Validators.minLength(4)
        ]],
        latitude: ['', [
          Validators.required,
          Validators.pattern('^[0-9]*(\.[0-9]{1,8})?$')
        ]],
        longitude: ['', [
          Validators.required,
          Validators.pattern('^[0-9]*(\.[0-9]{1,8})?$')
        ]],
        tags: ['', [

        ]]
      });
  }

  ngOnInit() {
    let id = null;
    if (this.location) {
      id = (this.location as DTULocation).id ?
        (this.location as DTULocation).id :
        (this.location as LocationSuggestion).suggestionID;

      this.tags = this.location.tags ? this.location.tags : [];
      this.nameReadOnly = true;
    }

    this.form.setValue({
      id: this.location ? id : '',
      description: this.location ? this.location.description : '',
      floor: this.location ? this.location.floor.toString() : '',
      landmark: this.location ? this.location.landmark : '',
      name: this.location ? this.location.name : '',
      latitude: this.location ? this.location.latitude : '',
      longitude: this.location ? this.location.longitude : '',
      tags: this.tags
    });

    if (this.hideId) {
      this.id.disable();
    }
  }


  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      const tagId = this.tags.indexOf(value);
      if (tagId < 0) {
        this.tags.push(value.trim());
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  get id() {
    return this.form.get('id');
  }

  get description() {
    return this.form.get('description');
  }

  get floor() {
    return this.form.get('floor');
  }

  get landmark() {
    return this.form.get('landmark');
  }

  get name() {
    return this.form.get('name');
  }

  get latitude() {
    return this.form.get('latitude');
  }

  get longitude() {
    return this.form.get('longitude');
  }

}
