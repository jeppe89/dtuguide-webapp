import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DTUFloors } from './../shared/floors';
import { LocationService } from './../shared/location.service';
import { DTULocation } from './../shared/location.interface';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  @Input() location: DTULocation;
  floors = DTUFloors;

  constructor(private service: LocationService,
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

  goBack() {
    this.loc.back();
  }

}
