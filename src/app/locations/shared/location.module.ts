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
import { AppRoutingModule } from '../../app-routing.module';
import { LocationComponent } from '../location/location.component';
import { Routes, RouterModule } from '@angular/router';
import { LocationEditComponent } from '../location-edit/location-edit.component';
import { LocationFormComponent } from '../location-form/location-form.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: 'location', component: LocationComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: LocationListComponent },
      { path: 'create', component: LocationCreateComponent },
      { path: 'detail/:id', component: LocationDetailComponent },
      { path: 'edit/:id', component: LocationEditComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  declarations: [
    LocationListComponent,
    LocationCreateComponent,
    LocationDetailComponent,
    LocationComponent,
    LocationEditComponent,
    LocationFormComponent,
  ],
  providers: [
    LocationService
  ]
})
export class LocationModule { }
