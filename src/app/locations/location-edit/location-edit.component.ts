import { Component, OnInit, Inject, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DTULocation } from '../shared/location.interface';
import { LocationService } from '../shared/location.service';
import { LocationFormComponent } from '../location-form/location-form.component';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  // form: FormGroup;
  title = 'Edit Location';
  disableElements = [ 'id' ];

  @Input() location: DTULocation;
  @ViewChild(LocationFormComponent) locationFormComp: LocationFormComponent;

  constructor(
    private service: LocationService,
    private route: ActivatedRoute,
    private loc: Location) { }

  ngOnInit() {
    this.getLocation();
  }

  getLocation(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getLocation(id)
      .subscribe(location => this.location = location);
  }

  saveChanges(): void {
    if (this.locationFormComp.form.valid) {
      const newLocation = this.locationFormComp.form.value;
      this.service.editLocation(newLocation).subscribe(location => console.log('Saved to database: ' + location));
    }
  }

  goBack(): void {
    this.loc.back();
  }

}
