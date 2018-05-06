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
  MatMenuModule,
  MatDialogModule,
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
    MatMenuModule,
    MatDialogModule
  ]
})
export class AppMaterialModule { }
