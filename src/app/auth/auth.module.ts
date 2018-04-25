import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule, CookieService } from 'ngx-cookie';

import { AuthService } from './auth.service';

@NgModule({
  imports: [
  ],
  declarations: [],
  providers: [AuthService]
})
export class AuthModule { }
