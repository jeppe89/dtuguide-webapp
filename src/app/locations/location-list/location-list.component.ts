import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { catchError, finalize, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { merge } from 'rxjs/observable/merge';

import { DTULocation } from '../shared/location.interface';
import { LocationService } from './../shared/location.service';
import { LocationDataSource } from '../shared/location.datasource';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit, AfterViewInit {
  title = 'Locations';
  dataSource: LocationDataSource;
  displayedColumns: string[] = ['id', 'name', 'floor', 'controls'];
  hoverIndex: number = null;
  totalItems$: Observable<number>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    private service: LocationService) {}

  ngOnInit() {
    this.dataSource = new LocationDataSource(this.service);
    this.dataSource.loadLocations('', 1, 5);
    this.totalItems$ = this.dataSource.totalItems$;
  }

  ngAfterViewInit() {

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => {
              this.paginator.pageIndex = 0;
              this.loadLocationsPage();
          })
      ).subscribe();

    merge(this.paginator.page)
      .pipe(
          tap(() => this.loadLocationsPage())
      )
      .subscribe();
  }

  loadLocationsPage() {
    this.dataSource.loadLocations(
      this.filter.nativeElement.value,
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize
    );
  }

}
