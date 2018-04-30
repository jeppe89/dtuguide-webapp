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
import { LocationSuggestionFormComponent } from '../location-suggestion-form/location-suggestion-form.component';

const routes: Routes = [
  { path: 'suggestion', component: LocationSuggestionComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: LocationSuggestionListComponent },
      { path: 'detail/:id', component: LocationSuggestionDetailComponent },
      { path: 'edit/:id', component: LocationSuggestionEditComponent }
      /*
      { path: 'create', component: LocationCreateComponent },
      */
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
    LocationSuggestionComponent,
    LocationSuggestionListComponent,
    LocationSuggestionDetailComponent,
    LocationSuggestionEditComponent,
    LocationSuggestionFormComponent
  ],
  providers: [LocationSuggestionService]
})
export class LocationSuggestionModule { }
