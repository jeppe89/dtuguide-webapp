import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionDetailCardComponent } from './suggestion-detail-card.component';
import { AppMaterialModule } from '../../app-material.module';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
  exports: [
    SuggestionDetailCardComponent
  ],
  declarations: [SuggestionDetailCardComponent]
})
export class SuggestionDetailCardModule { }
