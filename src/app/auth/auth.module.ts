import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule, CookieService } from 'ngx-cookie';

import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  imports: [
  ],
  declarations: [],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AuthModule { }
