import { DataSource } from '@angular/cdk/table';
import { DTULocation } from './location.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocationService } from './location.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { SearchData } from '../../utils/search-data.interface';

export class LocationDataSource extends DataSource<DTULocation> {
    private locationsSubject = new BehaviorSubject<DTULocation[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalItemsSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public totalItems$ = this.totalItemsSubject.asObservable();

    constructor(private service: LocationService) {
      super();
    }
    connect(collectionViewer: CollectionViewer): Observable<DTULocation[]> {
      return this.locationsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
      this.locationsSubject.complete();
      this.loadingSubject.complete();
      this.totalItemsSubject.complete();
    }

    loadLocations(filter: string,
      pageIndex: number, pageSize: number) {
      this.loadingSubject.next(true);

      this.service.getLocations(filter,
        pageIndex, pageSize).pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        ).subscribe((search: SearchData) => {
          this.totalItemsSubject.next(search.totalItems);
          this.locationsSubject.next(search.data as DTULocation[]);
        });
    }
}
