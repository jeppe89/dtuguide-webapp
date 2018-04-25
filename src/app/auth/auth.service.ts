import { browser } from 'protractor';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];
  // url: 'http://arvid-langsoe.dk/REST/security/session';
  url = 'http://arvid-langsoe.dk:8080/REST/security/session';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private cookie: CookieService) {
      this.handleError = httpErrorHandler.createHandleError('AuthService');
    }

  public getAuthorizationToken(): string {
    // return localStorage.getItem('access_token');
    return this.cookie.get('sessionToken');
  }
  /*
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getAuthorizationToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return !this.jwtHelper.isTokenExpired(token);
  }

  public decodeToken(): any {
    const token = this.getAuthorizationToken();
    return this.jwtHelper.decodeToken(token);
  }
  */

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
  /*
  testAuth(object: LoginCredentials): Observable<LoginCredentials> {
    return this.http.post<LoginCredentials>(this.url, object, httpOptions)
      .pipe(
        catchError(this.handleError('testAuth', object))
    );
  }
  */

  public authenticate(username: string, password: string) {
    return this.http.post(this.url, {username, password})
    .pipe(
      catchError(this.handleError('authenticate', { username, password }))
    ).subscribe(data => console.log(data));
  }

  public authDTUInside() {
  }
}
