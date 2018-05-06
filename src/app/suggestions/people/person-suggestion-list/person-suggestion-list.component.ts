import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';

import { PersonSuggestionDataSource } from '../shared/person-suggestion.datasource';
import { PersonSuggestionService } from '../shared/person-suggestion.service';



@Component({
  selector: 'app-person-suggestion-list',
  templateUrl: './person-suggestion-list.component.html',
  styleUrls: ['./person-suggestion-list.component.css']
})
export class PersonSuggestionListComponent implements OnInit, AfterViewInit {
  title = 'People Suggestions';
  dataSource: PersonSuggestionDataSource;
  displayedColumns: string[] = ['id', 'author', 'name', 'controls' ];
  hoverIndex: number = null;
  totalItems$: Observable<number>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(private service: PersonSuggestionService) { }

  ngOnInit() {
    this.dataSource = new PersonSuggestionDataSource(this.service);
    this.dataSource.loadSuggestions('', 1, 5);
    this.totalItems$ = this.dataSource.totalItems$;
  }

  ngAfterViewInit() {

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => {
              this.paginator.pageIndex = 0;
              this.loadSuggestionsPage();
          })
      ).subscribe();

    merge(this.paginator.page)
      .pipe(
          tap(() => this.loadSuggestionsPage())
      )
      .subscribe();
  }

  loadSuggestionsPage() {
    this.dataSource.loadSuggestions(
      this.filter.nativeElement.value,
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize
    );
  }
  /*
  approveSuggestion(suggestion: LocationSuggestion) {
    this.service.approveSuggestion(suggestion).subscribe(() => {
      this.service.deleteSuggestion(suggestion).subscribe(() => {
        this.loadSuggestionsPage();
      });
    });
  }
  */

}
