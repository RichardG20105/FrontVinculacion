import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

//Components
//--Estudiante---
import { EstudianteListarComponent } from './components/Estudiante/estudiante-listar/estudiante-listar.component';
//---Proyecto----
import { ProyectoListarComponent } from './components/Proyecto/proyecto-listar/proyecto-listar.component';
import { ProyectoCrearComponent } from './components/Proyecto/proyecto-crear/proyecto-crear.component';
//---Docente---
import { DocenteListarComponent } from './components/Docente/docente-listar/docente-listar.component';
import { DocenteCrearComponent } from './components/Docente/docente-crear/docente-crear.component';
import { EstudianteCrearComponent } from './components/Estudiante/estudiante-crear/estudiante-crear.component';
import { DocenteModificarComponent } from './components/Docente/docente-modificar/docente-modificar.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    ToolbarComponent,
    EstudianteListarComponent,
    ProyectoCrearComponent,
    ProyectoListarComponent,
    DocenteListarComponent,
    DocenteCrearComponent,
    EstudianteCrearComponent,
    DocenteModificarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ProyectoCrearComponent]
})
export class AppModule { }
