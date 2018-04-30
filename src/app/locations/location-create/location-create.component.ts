import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';

import { LocationService } from './../shared/location.service';
import { DTULocation } from './../shared/location.interface';
import { LocationFormComponent } from './../location-form/location-form.component';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent implements OnInit {
  title = 'Create Location';
  @ViewChild(LocationFormComponent) locationComp: LocationFormComponent;

  constructor(private service: LocationService, private loc: Location) { }

  ngOnInit() {
  }

  addLocation() {
    const newLocation: DTULocation = this.locationComp.form.value;
    this.service.addLocation(newLocation)
      .subscribe(data => console.log(data), // success path
        error => console.log(error) // error path);
      );
  }

  goBack() {
    return this.loc.back();
  }
}
