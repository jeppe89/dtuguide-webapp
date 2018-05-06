import { PersonService } from './../shared/person.service';
import { MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { PersonDataSource } from './../shared/person.datasource';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit, AfterViewInit {
  title = 'People';
  dataSource: PersonDataSource;
  displayedColumns = ['name', 'role', 'room', 'controls'];
  hoverIndex: number = null;
  totalItems$: Observable<number>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    private service: PersonService) { }

  ngOnInit() {
    this.dataSource = new PersonDataSource(this.service);
    this.dataSource.loadPeople('', 1, 5);
    this.totalItems$ = this.dataSource.totalItems$;
  }

  ngAfterViewInit() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => {
              this.paginator.pageIndex = 0;
              this.loadPeoplePage();
          })
      ).subscribe();

    merge(this.paginator.page)
      .pipe(
          tap(() => this.loadPeoplePage())
      )
      .subscribe();
  }

  loadPeoplePage() {
    this.dataSource.loadPeople(
      this.filter.nativeElement.value,
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize
    );
  }

}
