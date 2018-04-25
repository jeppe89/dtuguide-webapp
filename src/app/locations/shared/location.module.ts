import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './../../app-material.module';
import { LocationService } from './location.service';
import { LocationListComponent } from '../location-list/location-list.component';
import { LocationCreateComponent } from '../location-create/location-create.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  declarations: [
    LocationListComponent,
    LocationCreateComponent,
  ],
  providers: [
    LocationService
  ]
})
export class LocationModule { }
