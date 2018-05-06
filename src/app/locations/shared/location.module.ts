import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './../../app-material.module';
import { LocationService } from './location.service';
import { LocationListComponent } from '../location-list/location-list.component';
import { LocationCreateComponent } from '../location-create/location-create.component';
import { LocationDetailComponent } from '../location-detail/location-detail.component';
import { LocationComponent } from '../location/location.component';
import { Routes, RouterModule } from '@angular/router';
import { LocationEditComponent } from '../location-edit/location-edit.component';
import { AuthGuard } from '../../auth/auth.guard';
import { LocationFormModule } from '../location-form/location-form.module';

const routes: Routes = [
  { path: 'locations', component: LocationListComponent, canActivateChild: [AuthGuard],
    children: [
      { path: '', component: LocationListComponent },
      // { path: 'create', component: LocationCreateComponent },
      { path: ':id', component: LocationDetailComponent },
      // { path: ':id/edit', component: LocationEditComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    LocationFormModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    LocationListComponent,
    LocationCreateComponent,
    LocationDetailComponent,
    LocationComponent,
    LocationEditComponent,
  ],
  providers: [
    LocationService
  ]
})
export class LocationModule { }
