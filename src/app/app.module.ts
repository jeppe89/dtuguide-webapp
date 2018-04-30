import { LocationSuggestionModule } from './locations/suggestions/shared/location-suggestion.module';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LocationModule } from './locations/shared/location.module';
import { AppMaterialModule } from './app-material.module';
import { MessageService } from './message.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { UserModule } from './users/shared/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CookieModule } from 'ngx-cookie';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { AuthInterceptor } from './auth/auth.interceptor';

export function jwtOptionsFactory(authService: AuthService) {
  return {
    tokenGetter: () => {
      return authService.getAuthorizationToken();
    }
  };
}

const routes: Routes = [
  { path: '', redirectTo: 'location', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AppMaterialModule,
    AuthModule,
    LocationModule,
    UserModule,
    LocationSuggestionModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [AuthService]
      }
    }),
    CookieModule.forRoot()
  ],
  providers: [
    HttpErrorHandler,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
