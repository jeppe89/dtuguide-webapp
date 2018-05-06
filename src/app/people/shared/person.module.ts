import { AppMaterialModule } from './../../app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './../../auth/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from '../person-list/person-list.component';
import { PersonService } from './person.service';
import { PersonDetailComponent } from '../person-detail/person-detail.component';
import { PersonComponent } from '../person/person.component';

const routes: Routes = [
  { path: 'people', component: PersonComponent, canActivate: [AuthGuard],
  children: [
    { path: '', component: PersonListComponent },
    { path: ':id', component: PersonDetailComponent }
  ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    PersonListComponent,
    PersonDetailComponent,
    PersonComponent
  ],
  providers: [PersonService]
})
export class PersonModule { }
