import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';


import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { MatSortModule } from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatSidenavModule,
    HttpClientModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  exports: [
    MatSliderModule,
    MatSidenavModule,
    HttpClientModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule
  ],
})
export class SharedModule { }
