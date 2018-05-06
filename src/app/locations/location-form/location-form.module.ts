import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationFormComponent } from '../location-form/location-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../app-material.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule,
  ],
  exports: [
    LocationFormComponent
  ],
  declarations: [LocationFormComponent]
})
export class LocationFormModule { }
