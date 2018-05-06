import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { PersonSuggestionService } from './person-suggestion.service';
import { PersonSuggestionComponent } from './../person-suggestion/person-suggestion.component';
import { PersonSuggestionListComponent } from '../person-suggestion-list/person-suggestion-list.component';
import { AppMaterialModule } from '../../../app-material.module';
import { AuthGuard } from '../../../auth/auth.guard';
import { PersonSuggestionCreateComponent } from '../person-suggestion-create/person-suggestion-create.component';
import { PersonFormModule } from '../../../people/person-form/person-form.module';
import { PersonSuggestionDetailComponent } from '../person-suggestion-detail/person-suggestion-detail.component';
import { PersonSuggestionEditComponent } from '../person-suggestion-edit/person-suggestion-edit.component';

const routes: Routes = [
  { path: 'suggestions/people', component: PersonSuggestionComponent, canActivateChild: [AuthGuard],
    children: [
      { path: '', component: PersonSuggestionListComponent },
      { path: 'create', component: PersonSuggestionCreateComponent },
      { path: ':id', component: PersonSuggestionDetailComponent },
      { path: ':id/edit', component: PersonSuggestionEditComponent}
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
    PersonFormModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    PersonSuggestionComponent,
    PersonSuggestionListComponent,
    PersonSuggestionCreateComponent,
    PersonSuggestionDetailComponent,
    PersonSuggestionEditComponent
  ],
  providers: [PersonSuggestionService]
})
export class PersonSuggestionModule { }
