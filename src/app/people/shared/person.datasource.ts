import { PersonService } from './person.service';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { SearchData } from '../../utils/search-data.interface';
import { Person } from './person.interface';

export class PersonDataSource extends DataSource<Person> {
    private peopleSubject = new BehaviorSubject<Person[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalItemsSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public totalItems$ = this.totalItemsSubject.asObservable();

    constructor(private service: PersonService) {
      super();
    }
    connect(collectionViewer: CollectionViewer): Observable<Person[]> {
      return this.peopleSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
      this.peopleSubject.complete();
      this.loadingSubject.complete();
      this.totalItemsSubject.complete();
    }

    loadPeople(filter: string,
      pageIndex: number, pageSize: number) {
      this.loadingSubject.next(true);

      this.service.getPeople(filter,
        pageIndex, pageSize).pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        ).subscribe((search: SearchData) => {
          this.totalItemsSubject.next(search.totalItems);
          this.peopleSubject.next(search.data as Person[]);
        });
    }
}
