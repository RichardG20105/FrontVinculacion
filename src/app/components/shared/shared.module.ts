import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';


import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatSidenavModule,
    HttpClientModule,
    MatTableModule
  ],
  exports: [
    MatSliderModule,
    MatSidenavModule,
    HttpClientModule,
    MatTableModule
  ],
})
export class SharedModule { }
