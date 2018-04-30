import { DataSource } from '@angular/cdk/table';
import { DTULocation } from './location.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocationService } from './location.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

export class LocationDataSource extends DataSource<DTULocation> {
    private locationsSubject = new BehaviorSubject<DTULocation[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private service: LocationService) {
      super();
    }
    connect(collectionViewer: CollectionViewer): Observable<DTULocation[]> {
      return this.locationsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
      this.locationsSubject.complete();
      this.loadingSubject.complete();
    }

    loadLocations(filter: string,
      sortDirection: string, pageIndex: number, pageSize: number) {
      this.loadingSubject.next(true);

      this.service.getLocations(filter, sortDirection,
        pageIndex, pageSize).pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        ).subscribe(locations => this.locationsSubject.next(locations));
    }
}
