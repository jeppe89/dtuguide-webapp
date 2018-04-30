import { DTUFloors } from './../shared/floors';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DTULocation } from '../shared/location.interface';
import { LocationService } from '../shared/location.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit {

  form: FormGroup;
  floors: string[] = DTUFloors;
  @Input() location: DTULocation;
  @Input() disabledElements: string[];

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private service: LocationService) {
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
    this.form.setValue({
      id: this.location ? this.location.id : '',
      description: this.location ? this.location.description : '',
      floor: this.location ? this.location.floor : '',
      landmark: this.location ? this.location.landmark : '',
      name: this.location ? this.location.name : '',
      latitude: this.location ? this.location.latitude : '',
      longitude: this.location ? this.location.longitude : '',
    });

    if (this.disabledElements) {
      for (const element of this.disabledElements) {
        this.form.get(element).disable();
      }
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
