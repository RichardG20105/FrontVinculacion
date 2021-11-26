import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

//Components
import { DocenteComponent } from './components/docente/docente.component';
import { EstudianteListarComponent } from './components/Estudiante/estudiante-listar/estudiante-listar.component';
import { ProyectoCrearComponent } from './components/Proyecto/proyecto-crear/proyecto-crear.component';
import { ProyectoListarComponent } from './components/Proyecto/proyecto-listar/proyecto-listar.component';

@NgModule({
  declarations: [
    AppComponent,
    DocenteComponent,
    SideNavComponent,
    ToolbarComponent,
    DocenteComponent,
    EstudianteListarComponent,
    ProyectoCrearComponent,
    ProyectoListarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
