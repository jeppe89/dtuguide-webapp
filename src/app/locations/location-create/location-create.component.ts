import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

import { LocationService } from './../shared/location.service';
import { DTULocation } from './../shared/location.interface';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent implements OnInit {
  form: FormGroup;
  title = 'Create Location';
  location: DTULocation;
  error: any;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private service: LocationService) {
      this.form = fb.group({
        name: ['', [
          Validators.required,
          Validators.minLength(4)
        ]]
      });
  }
  /*
  errorMessage(formControl: AbstractControl) {
    return formControl.hasError('required') ? 'You must enter a value' :
    formControl.hasError('minlength') ? 'Must be more than 4 characters' :
      '';
  }
  */
  abstractControl(formControlName: string) {
    return this.form.get(formControlName);
  }

  get name() {
    return this.form.get('name');
  }

  ngOnInit() {
  }

  add() {
    const newLocation: DTULocation = this.form.value as DTULocation;
    this.service.addLocation(newLocation)
      .subscribe(data => console.log(data), // success path
        error => console.log(error) // error path);
      );
  }
}
