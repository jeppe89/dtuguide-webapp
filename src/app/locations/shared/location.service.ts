import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { DTULocation } from './location.interface';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

@Injectable()
export class LocationService {

  url = 'http://localhost:3000/locations';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('LocationService');
  }

  getLocations(): Observable<DTULocation[]> {
    return this.http.get<DTULocation[]>(this.url)
      .pipe(
        catchError(this.handleError('getLocations', []))
      );
  }

  addLocation(location: DTULocation): Observable<DTULocation> {
    return this.http.post<DTULocation>(this.url, location)
      .pipe(
        catchError(this.handleError('addLocation', location))
      );
  }
  /*
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.url, hero, httpOptions)
      .pipe(
        catchError(this.handleError('addHero', hero))
      );
  }
  */
}
