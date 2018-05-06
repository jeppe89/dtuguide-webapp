import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { LocationSuggestion } from './location-suggestion.interface';
import { LocationSuggestionService } from './location-suggestion.service';
import { SearchData } from '../../../utils/search-data.interface';


export class LocationSuggestionDataSource extends DataSource<LocationSuggestion> {
    private locationsSubject = new BehaviorSubject<LocationSuggestion[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalItemsSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public totalItems$ = this.totalItemsSubject.asObservable();

    constructor(private service: LocationSuggestionService) {
      super();
    }
    connect(collectionViewer: CollectionViewer): Observable<LocationSuggestion[]> {
      return this.locationsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
      this.locationsSubject.complete();
      this.loadingSubject.complete();
      this.totalItemsSubject.complete();
    }

    loadSuggestions(filter: string, pageIndex: number, pageSize: number) {
      this.loadingSubject.next(true);

      this.service.getSuggestions(filter,
        pageIndex, pageSize).pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        ).subscribe((search: SearchData) => {
          this.totalItemsSubject.next(search.totalItems);
          this.locationsSubject.next(search.data as LocationSuggestion[]);
        });
    }
}
