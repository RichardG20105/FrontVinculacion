import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

//Components
 
import { DocenteComponent } from './components/docente/docente.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';

@NgModule({
  declarations: [
    AppComponent,
    DocenteComponent,
    ProyectoComponent,
    SideNavComponent,
    EstudianteComponent,
    ToolbarComponent,
    DocenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
