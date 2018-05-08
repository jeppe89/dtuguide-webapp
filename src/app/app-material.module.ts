import { NgModule } from '@angular/core';

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatCardModule,
  MatSnackBarModule,
  MatGridListModule,
  MatDialogModule,
  MatChipsModule,
  MatIconModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatGridListModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class AppMaterialModule { }
