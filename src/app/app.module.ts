import { NotificationDialogComponent } from './utils/notification-dialog/notification-dialog.component';
import { PersonModule } from './people/shared/person.module';
import { NotificationService } from './utils/notification.service';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';

import { AppMaterialModule } from './app-material.module';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './locations/shared/location.module';
import { UserModule } from './users/shared/user.module';
import { LocationSuggestionModule } from './suggestions/locations/shared/location-suggestion.module';
import { PersonSuggestionModule } from './suggestions/people/shared/person-suggestion.module';
import { HttpErrorHandler } from './utils/http-error-handler.service';
import { MessageService } from './utils/message.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PageNotFoundComponent } from './utils/page-not-found.component';


/*
export function jwtOptionsFactory(authService: AuthService) {
  return {
    tokenGetter: () => {
      return authService.getAuthorizationToken();
    }
  };
}
*/

const routes: Routes = [
  { path: '', redirectTo: 'locations', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'locations', loadChildren: './locations/shared/location.module' },
  { path: 'people', loadChildren: './people/shared/person.module' },
  { path: 'suggestions', component: SuggestionsComponent, canActivate: [AuthGuard],
    children: [
      { path: 'locations', loadChildren: './suggestions/locations/shared/location-suggestion.module#LocationSuggestionModule' },
      { path: 'people', loadChildren: './suggestions/people/shared/person-suggestion.module#PersonSuggestionModule' },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    SuggestionsComponent,
    PageNotFoundComponent,
    NotificationDialogComponent
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
    PersonSuggestionModule,
    PersonModule,
    /*
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [AuthService]
      }
    }),
    CookieModule.forRoot()
    */
  ],
  providers: [
    HttpErrorHandler,
    MessageService,
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [NotificationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
