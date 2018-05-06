import { Component, OnInit, Input, Inject, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DTUFloors } from '../../locations/shared/floors';
import { LocationSuggestion } from './../../suggestions/locations/shared/location-suggestion.interface';
import { DTULocation } from '../../locations/shared/location.interface';


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
          Validators.required
        ]],
        longitude: ['', [
          Validators.required
        ]]
      });
  }

  ngOnInit() {
    let id = null;
    if (this.location) {
      id = (this.location as DTULocation).id ?
        (this.location as DTULocation).id :
        (this.location as LocationSuggestion).suggestionID;
    }

    this.form.setValue({
      id: this.location ? id : '',
      description: this.location ? this.location.description : '',
      floor: this.location ? this.location.floor.toString() : '',
      landmark: this.location ? this.location.landmark : '',
      name: this.location ? this.location.name : '',
      latitude: this.location ? this.location.latitude : '',
      longitude: this.location ? this.location.longitude : '',
    });

    if (this.hideId) {
      this.id.disable();
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
