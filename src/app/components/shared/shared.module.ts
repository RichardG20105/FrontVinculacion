import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    HttpClientModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
})
export class SharedModule { }
