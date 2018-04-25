import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { LocationCreateComponent } from './locations/location-create/location-create.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { RoleGuard } from './auth/role.guard';

const routes: Routes = [
  { path: 'locations', component: LocationListComponent },
  {
    path: 'locations/create',
    component: LocationCreateComponent,
    /*
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'admin'
    }
    */
  },
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
