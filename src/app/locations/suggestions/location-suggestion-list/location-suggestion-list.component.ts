import { LocationSuggestion } from './../shared/location-suggestion.interface';
import { LocationSuggestionService } from './../shared/location-suggestion.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { LocationSuggestionDataSource } from './../shared/location-suggestion.datasource';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';

@Component({
  selector: 'app-location-suggestion-list',
  templateUrl: './location-suggestion-list.component.html',
  styleUrls: ['./location-suggestion-list.component.css']
})
export class LocationSuggestionListComponent implements OnInit, AfterViewInit {

  dataSource: LocationSuggestionDataSource;
  displayedColumns: string[] = ['id', 'author', 'name', 'controls' ];
  hoverIndex: number = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private service: LocationSuggestionService) { }

  ngOnInit() {
    this.dataSource = new LocationSuggestionDataSource(this.service);
    this.dataSource.loadSuggestions('', 'asc', 1, 5);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => {
              this.paginator.pageIndex = 0;
              this.loadSuggestionsPage();
          })
      ).subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadSuggestionsPage())
      )
      .subscribe();
  }

  loadSuggestionsPage() {
    this.dataSource.loadSuggestions(
      this.filter.nativeElement.value,
      this.sort.direction,
      (this.paginator.pageIndex + 1),
      this.paginator.pageSize
    );
  }

  approveSuggestion(suggestion: LocationSuggestion) {
    this.service.approveSuggestion(suggestion).subscribe(() => {
      this.service.deleteSuggestion(suggestion).subscribe(() => {
        this.loadSuggestionsPage();
      });
    });
  }

}
