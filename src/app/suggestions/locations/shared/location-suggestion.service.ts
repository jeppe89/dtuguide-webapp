import { LocationSuggestionPut } from './location-suggestion-put.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { LocationSuggestion } from './location-suggestion.interface';
import { HandleError, HttpErrorHandler } from '../../../utils/http-error-handler.service';
import { DTULocation } from '../../../locations/shared/location.interface';
import { SearchData } from '../../../utils/search-data.interface';


@Injectable()
export class LocationSuggestionService {

  url = 'http://arvid-langsoe.dk/REST/searchable/suggestions/locations';
  // url = 'http://localhost:3000/suggestions_locations';
  // approveUrl = 'http://localhost:3000/locations';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('LocationSuggestionService');
  }

  getSuggestions(
    filter = '',
    pageNumber = 0, pageSize = 5): Observable<SearchData> {
    return this.http.get<SearchData>(this.url, {
      params: new HttpParams()
      .set('searchString', filter)
      .set('sort', 'name')
      .set('page', pageNumber.toString())
      .set('limit', pageSize.toString())
    })
    .pipe(
      catchError(this.handleError('getSuggestions', null))
    );
  }

  getSuggestion(id): Observable<LocationSuggestion> {
    return this.http.get<LocationSuggestion>(this.url + '/' + id)
      .pipe(
        catchError(this.handleError('getSuggestion', id))
      );
  }

  editSuggestion(suggestion: LocationSuggestionPut): Observable<LocationSuggestionPut> {
    return this.http.put<LocationSuggestionPut>(this.url + '/' + suggestion.oldLocation.suggestionID, suggestion)
      .pipe(
        catchError(this.handleError('editSuggestion', suggestion))
      );
  }

  addSuggestion(suggestion: LocationSuggestion): Observable<LocationSuggestion> {
    return this.http.post<LocationSuggestion>(this.url, suggestion)
      .pipe(
        catchError(this.handleError('addSuggestion', suggestion))
      );
  }

  deleteSuggestion(id): Observable<LocationSuggestion> {
    return this.http.delete<LocationSuggestion>(this.url + '/' + id)
      .pipe(
        catchError(this.handleError('deleteSuggestion', id))
      );
  }

  approveSuggestion(id): Observable<any> {
    return this.http.post<any>(this.url + '/' + id + '/approval', id)
      .pipe(
        catchError(this.handleError('approveSuggestion', id))
      );
  }
}
