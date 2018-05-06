import { SearchData } from './../../../utils/search-data.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { HandleError, HttpErrorHandler } from '../../../utils/http-error-handler.service';
import { PersonSuggestion } from './person-suggestion.interface';
import { PersonSuggestionPut } from './person-suggestion-put.interface';

@Injectable()
export class PersonSuggestionService {

  url = 'http://arvid-langsoe.dk/REST/searchable/suggestions/people';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('PersonSuggestionService');
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

  getSuggestion(id): Observable<PersonSuggestion> {
    return this.http.get<PersonSuggestion>(this.url + '/' + id)
    .pipe(
      catchError(this.handleError('getSuggestion', id))
    );
  }

  editSuggestion(suggestion: PersonSuggestionPut): Observable<PersonSuggestionPut> {
    return this.http.put<PersonSuggestionPut>(this.url + '/' + suggestion.oldPerson.suggestionID, suggestion)
    .pipe(
      catchError(this.handleError('editSuggestion', suggestion))
    );
  }

  addSuggestion(suggestion: PersonSuggestion): Observable<PersonSuggestion> {
    return this.http.post<PersonSuggestion>(this.url, suggestion)
    .pipe(
      catchError(this.handleError('addSuggestion', suggestion))
    );
  }

  deleteSuggestion(id): Observable<PersonSuggestion> {
    return this.http.delete<PersonSuggestion>(this.url + '/' + id)
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
