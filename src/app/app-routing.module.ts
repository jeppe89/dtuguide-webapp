import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationListComponent } from './locations/location-list/location-list.component';
import { LocationCreateComponent } from './locations/location-create/location-create.component';
import { UserLoginComponent } from './users/user-login/user-login.component';

const routes: Routes = [
  { path: 'locations', component: LocationListComponent },
  { path: 'locations/create', component: LocationCreateComponent },
  { path: 'login', component: UserLoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
