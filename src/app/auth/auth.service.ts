import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import { User } from './../users/shared/user.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];
  // url: 'http://arvid-langsoe.dk/REST/security/session';
  url = 'http://arvid-langsoe.dk/REST/security/session';
  private handleError: HandleError;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private router: Router) {
      this.handleError = httpErrorHandler.createHandleError('AuthService');
    }

  public getAuthorizationToken(): string {
    // return localStorage.getItem('access_token');
    return localStorage.getItem('loggedIn');
  }

  public isAuthenticated(): any {
    // get the token
    const token = this.getAuthorizationToken();
    // return a boolean reflecting
    // whether or not the token is expired
    // return !this.jwtHelper.isTokenExpired(token);
    return token;
  }
  /*
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
  public authenticate(username: string, password: string) {
    return this.http.post(this.url, {username, password})
      .pipe(
        catchError(this.handleError('authenticate', { username, password }))
      ).subscribe(data => console.log(data));
  }
  */

  login(user: User) {
    return this.http.post(this.url, user)
      .subscribe(data => {
        console.log(data);

        if (data['validSession']) {
          this.loggedIn.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  checkToken() {
    return this.http.get(this.url)
      .pipe(
        catchError(this.handleError('checkToken', { }))
      ).subscribe(data => console.log(data));
  }

  authDTUInside() {
  }
}
