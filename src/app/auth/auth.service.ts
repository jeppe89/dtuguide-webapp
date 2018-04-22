import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';

@Injectable()
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];
  url: 'http://localhost:3000/auth';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private jwtHelper: JwtHelperService) {
      this.handleError = httpErrorHandler.createHandleError('AuthService');
    }
  public getAuthorizationToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getAuthorizationToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return this.jwtHelper.isTokenExpired(token);
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  public auth(username: string, password: string) {
    const login = { username, password };
    return this.http.post(this.url, login)
      .pipe(
        catchError(this.handleError('authS', login))
      );
  }

  public authDTUInside() {
  }
}
