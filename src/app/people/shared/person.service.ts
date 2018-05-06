import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { HttpErrorHandler, HandleError } from './../../utils/http-error-handler.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchData } from '../../utils/search-data.interface';

@Injectable()
export class PersonService {
  url = 'http://arvid-langsoe.dk/REST/searchable?type=person';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('PersonService');
    }

  getPeople(
    filter = '', pageNumber= 0, pageSize = 5): Observable<SearchData> {
    return this.http.get<SearchData>(this.url, {
      params: new HttpParams()
      .set('searchString', filter)
      .set('sort', 'name')
      .set('page', pageNumber.toString())
      .set('limit', pageSize.toString())
   })
   .pipe(
     catchError(this.handleError('getPeople', null))
   );
  }

  getPerson(id): Observable<SearchData> {
    return this.http.get<SearchData>(this.url, {
      params: new HttpParams()
      .set('searchString', id)
      .set('limit', '1')
    })
    .pipe(
      catchError(this.handleError('getPerson', id))
    );
  }

}
