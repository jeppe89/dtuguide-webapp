import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, delay, map } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';

import { DTULocation } from './location.interface';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

@Injectable()
export class LocationService {
  // url = 'http://arvid-langsoe.dk/REST/searchable?type=location';
  url = 'http://localhost:3000/locations';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('LocationService');
  }

  getLocations(
    filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 5): Observable<DTULocation[]> {
    return this.http.get<DTULocation[]>(this.url, {
      params: new HttpParams()
      .set('q', filter)
      .set('_sort', 'id')
      .set('_order', sortOrder)
      .set('_page', pageNumber.toString())
      .set('_limit', pageSize.toString())
    })
    .pipe(
      catchError(this.handleError('getLocations', []))
    );
    /*
      .pipe(
        delay(3000),
        catchError(this.handleError('getLocations', []))
      );
      */
  }

  /*
  getAllLocations(): Observable<DTULocation[]> {
    return this.http.get<DTULocation[]>(this.url);
  }
  */

  getLocation(id): Observable<DTULocation> {
    return this.http.get<DTULocation>(this.url + '/' + id)
    .pipe(
      catchError(this.handleError('getLocation', id))
    );
  }

  addLocation(location: DTULocation): Observable<DTULocation> {
    return this.http.post<DTULocation>(this.url, location)
      .pipe(
        catchError(this.handleError('addLocation', location))
      );
  }

  editLocation(location: DTULocation): Observable<DTULocation> {
    return this.http.put<DTULocation>(this.url + '/' + location.id, location)
    .pipe(
      catchError(this.handleError('editLocation', location))
    );
  }
}
