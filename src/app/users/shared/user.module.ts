import { AuthModule } from './../../auth/auth.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserLoginComponent } from '../user-login/user-login.component';
import { AppMaterialModule } from '../../app-material.module';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule,
    AuthModule
  ],
  declarations: [UserLoginComponent]
})
export class UserModule { }
