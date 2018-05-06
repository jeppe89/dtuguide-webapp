import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { LocationSuggestionComponent } from '../location-suggestion/location-suggestion.component';
import { AppMaterialModule } from '../../../app-material.module';
import { LocationSuggestionListComponent } from '../location-suggestion-list/location-suggestion-list.component';
import { LocationSuggestionService } from './location-suggestion.service';
import { LocationSuggestionDetailComponent } from '../location-suggestion-detail/location-suggestion-detail.component';
import { LocationSuggestionEditComponent } from './../location-suggestion-edit/location-suggestion-edit.component';
import { LocationSuggestionCreateComponent } from '../location-suggestion-create/location-suggestion-create.component';
import { AuthGuard } from '../../../auth/auth.guard';
import { LocationFormModule } from '../../../locations/location-form/location-form.module';

const routes: Routes = [
  { path: 'suggestions/locations', component: LocationSuggestionComponent, canActivateChild: [AuthGuard],
    children: [
      { path: '', component: LocationSuggestionListComponent },
      { path: 'create', component: LocationSuggestionCreateComponent },
      { path: ':id', component: LocationSuggestionDetailComponent },
      { path: ':id/edit', component: LocationSuggestionEditComponent}
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
    LocationSuggestionComponent,
    LocationSuggestionListComponent,
    LocationSuggestionDetailComponent,
    LocationSuggestionEditComponent,
    LocationSuggestionCreateComponent,
  ],
  providers: [LocationSuggestionService]
})
export class LocationSuggestionModule { }
