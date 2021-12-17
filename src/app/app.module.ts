import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

//Components
//--Estudiante---
import { EstudianteListarComponent } from './components/Estudiante/estudiante-listar/estudiante-listar.component';
import { EstudianteCrearComponent } from './components/Estudiante/estudiante-crear/estudiante-crear.component';
import { EstudianteModificarComponent } from './components/Estudiante/estudiante-modificar/estudiante-modificar.component';
//---Proyecto----
import { ProyectoListarComponent } from './components/Proyecto/proyecto-listar/proyecto-listar.component';
import { ProyectoCrearComponent } from './components/Proyecto/proyecto-crear/proyecto-crear.component';
import { ProyectoModificarComponent } from './components/Proyecto/proyecto-modificar/proyecto-modificar.component';
//---Docente---
import { DocenteListarComponent } from './components/Docente/docente-listar/docente-listar.component';
import { DocenteCrearComponent } from './components/Docente/docente-crear/docente-crear.component';
import { DocenteModificarComponent } from './components/Docente/docente-modificar/docente-modificar.component';
//---Certificado---
import { CertificadoListarComponent } from './components/Certificado/certificado-listar/certificado-listar.component';
import { CertificadoCrearComponent } from './components/Certificado/certificado-crear/certificado-crear.component';
import { CertificadoModificarComponent } from './components/Certificado/certificado-modificar/certificado-modificar.component';
import { CustomMatPaginatorIntl } from './components/shared/paginacion';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttperrorService } from './services/httperror.service';
import { AlertifyService } from './services/alertify.service';



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
    DocenteModificarComponent,
    CertificadoListarComponent,
    CertificadoCrearComponent,
    ProyectoModificarComponent,
    EstudianteModificarComponent,
    CertificadoModificarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: HttperrorService,
      multi: true
    },
    AlertifyService
  ],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents:[ProyectoCrearComponent]
})
export class AppModule { }
