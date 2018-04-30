import { DTULocation } from './../../shared/location.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { HttpErrorHandler, HandleError } from './../../../http-error-handler.service';
import { Observable } from 'rxjs/Observable';
import { LocationSuggestion } from './location-suggestion.interface';
import { catchError } from 'rxjs/operators';


@Injectable()
export class LocationSuggestionService {

  url = 'http://localhost:3000/suggestions';
  approveUrl = 'http://localhost:3000/locations';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('LocationSuggestionService');
  }

  getSuggestions(
    filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 5): Observable<LocationSuggestion[]> {
    return this.http.get<LocationSuggestion[]>(this.url, {
      params: new HttpParams()
      .set('q', filter)
      .set('_sort', 'id')
      .set('_order', sortOrder)
      .set('_page', pageNumber.toString())
      .set('_limit', pageSize.toString())
    })
    .pipe(
      catchError(this.handleError('getSuggestions', []))
    );
  }

  getSuggestion(id): Observable<LocationSuggestion> {
    return this.http.get<LocationSuggestion>(this.url + '/' + id)
      .pipe(
        catchError(this.handleError('getSuggestion', id))
      );
  }

  editSuggestion(suggestion: LocationSuggestion): Observable<LocationSuggestion> {
    return this.http.put<LocationSuggestion>(this.url + '/' + suggestion.id, suggestion)
      .pipe(
        catchError(this.handleError('editSuggestion', suggestion))
      );
  }

  deleteSuggestion(suggestion: LocationSuggestion): Observable<LocationSuggestion> {
    return this.http.delete<LocationSuggestion>(this.url + '/' + suggestion.id)
      .pipe(
        catchError(this.handleError('deleteSuggestion', suggestion))
      );
  }

  approveSuggestion(suggestion: LocationSuggestion): Observable<any> {
    return this.http.put<DTULocation>(this.approveUrl + '/' + suggestion.location.id, suggestion.location)
      .pipe(
        catchError(this.handleError('approveSuggestion', suggestion))
      );
  }

}
