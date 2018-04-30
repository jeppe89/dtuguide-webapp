import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { catchError, finalize, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from './../../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked, AfterContentInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DTULocation } from '../shared/location.interface';
import { LocationService } from './../shared/location.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { merge } from 'rxjs/observable/merge';
import { LocationDataSource } from '../shared/location.datasource';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit, AfterViewInit {
  dataSource: LocationDataSource;
  displayedColumns: string[] = ['id', 'name', 'floor', 'controls'];
  hoverIndex: number = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    private service: LocationService) {}

  ngOnInit() {
    this.dataSource = new LocationDataSource(this.service);
    this.dataSource.loadLocations('', 'asc', 1, 5);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => {
              this.paginator.pageIndex = 0;
              this.loadLocationsPage();
          })
      ).subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadLocationsPage())
      )
      .subscribe();
  }

  loadLocationsPage() {
    this.dataSource.loadLocations(
      this.filter.nativeElement.value,
      this.sort.direction,
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize
    );
  }

}
