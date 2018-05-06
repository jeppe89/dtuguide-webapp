import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { SearchData } from './../../utils/search-data.interface';
import { DTULocation } from './location.interface';
import { HandleError, HttpErrorHandler } from '../../utils/http-error-handler.service';

@Injectable()
export class LocationService {
  url = 'http://arvid-langsoe.dk/REST/searchable?type=location';
  // url = 'http://localhost:3000/locations';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('LocationService');
  }

  getLocations(
    filter = '', pageNumber = 0, pageSize = 5): Observable<SearchData> {
    return this.http.get<SearchData>(this.url, {
      params: new HttpParams()
      .set('searchString', filter)
      .set('sort', 'name')
      .set('page', pageNumber.toString())
      .set('limit', pageSize.toString())
    })
    .pipe(
      catchError(this.handleError('getLocations', null))
    );
  }

  /*
  getAllLocations(): Observable<DTULocation[]> {
    return this.http.get<DTULocation[]>(this.url);
  }
  */

  getLocation(id): Observable<SearchData> {
    return this.http.get<SearchData>(this.url, {
      params: new HttpParams()
      .set('searchString', id)
      .set('limit', '1')
    })
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
