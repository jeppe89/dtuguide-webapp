import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { SearchData } from '../../../utils/search-data.interface';
import { PersonSuggestion } from './person-suggestion.interface';
import { PersonSuggestionService } from './person-suggestion.service';


export class PersonSuggestionDataSource extends DataSource<PersonSuggestion> {
    private peopleSubject = new BehaviorSubject<PersonSuggestion[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalItemsSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public totalItems$ = this.totalItemsSubject.asObservable();

    constructor(private service: PersonSuggestionService) {
      super();
    }
    connect(collectionViewer: CollectionViewer): Observable<PersonSuggestion[]> {
      return this.peopleSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
      this.peopleSubject.complete();
      this.loadingSubject.complete();
    }

    loadSuggestions(filter: string,
      pageIndex: number, pageSize: number) {
      this.loadingSubject.next(true);

      this.service.getSuggestions(filter,
        pageIndex, pageSize).pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        ).subscribe((search: SearchData) => {
          this.totalItemsSubject.next(search.totalItems);
          this.peopleSubject.next(search.data as PersonSuggestion[]);
        });
    }
}
