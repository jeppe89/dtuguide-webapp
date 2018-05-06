import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './../../app-material.module';

import { PersonFormComponent } from './person-form.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  exports: [
    PersonFormComponent
  ],
  declarations: [PersonFormComponent]
})
export class PersonFormModule { }
