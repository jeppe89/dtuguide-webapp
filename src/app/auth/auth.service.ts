import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { AuthSession } from './auth-session.interface';
import { Login } from './../users/shared/login.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { HandleError, HttpErrorHandler } from '../utils/http-error-handler.service';

@Injectable()
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];
  url = 'http://arvid-langsoe.dk/REST/security/session';

  private showTopBar = new BehaviorSubject<boolean>(false); // for hiding and showing top bar
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private router: Router) {
      this.handleError = httpErrorHandler.createHandleError('AuthService');
    }

  getSessionData(): AuthSession {
    const localSession = localStorage.getItem('session');

    if (localSession) {
      const session: AuthSession = JSON.parse(localSession);
      return session;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const currentDateInUnix = Number((Date.now() / 1000).toFixed());
    const session = this.getSessionData();
    if (session) {
      this.showTopBar.next(true);
      return session.exp > currentDateInUnix;
    }
    return false;
  }

  login(credentials: Login) {
    return this.http.post(this.url, credentials)
      .subscribe((session: AuthSession) => {
        console.log(session);
        if (session.validSession) {
          localStorage.setItem('session', JSON.stringify(session));
          this.router.navigate(['']);
        }
      });
  }

  logout() {
    localStorage.clear();
    this.showTopBar.next(false);
    this.router.navigate(['/login']);
  }

  checkToken() {
    return this.http.get(this.url)
      .pipe(
        catchError(this.handleError('checkToken', ''))
      ).subscribe(data => console.log(data));
  }

  get showTopBarIfAuth() {
    return this.showTopBar.asObservable();
  }

  authDTUInside() {
  }

  collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}
