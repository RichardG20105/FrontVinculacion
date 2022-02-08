import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CustomMatPaginatorIntl } from './components/shared/paginacion';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttperrorService } from './services/httperror.service';
import { AlertifyService } from './services/alertify.service';

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
import { CertificadoModificarComponent } from './components/Certificado/certificado-modificar/certificado-modificar.component';

import { ParticipaListarComponent } from './components/Participa/participa-listar/participa-listar.component';

import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es";
import { AsignarDocenteComponent } from './components/Participa/asignar-docente/asignar-docente.component';
import { ParticipaModificarComponent } from './components/Participa/participa-modificar/participa-modificar.component';
import { AsignarEstudianteComponent } from './components/Participa/asignar-estudiante/asignar-estudiante.component';
import { IntegraModificarComponent } from './components/Participa/integra-modificar/integra-modificar.component';
import { ReportesListaComponent } from './components/Reportes/reportes-lista/reportes-lista.component';
import { ParticipaDocenteFacultadTotalComponent } from './components/Reportes/participa-docente-facultad-total/participa-docente-facultad-total.component';
import { SeleccionFacultadComponent } from './components/Reportes/seleccion-facultad/seleccion-facultad.component';
import { ParticipaEstudianteFacultadComponent } from './components/Reportes/participa-estudiante-facultad/participa-estudiante-facultad.component';
import { EstudiantesFacultadGeneroComponent } from './components/Reportes/estudiantes-facultad-genero/estudiantes-facultad-genero.component';
import { SeleccionFacultadGeneroComponent } from './components/Reportes/seleccion-facultad-genero/seleccion-facultad-genero.component';
import { CertificadosFacultadComponent } from './components/Reportes/certificados-facultad/certificados-facultad.component';
import { SeleccionObservacionComponent } from './components/Reportes/seleccion-observacion/seleccion-observacion.component';
import { CertificadoObservacionComponent } from './components/Reportes/certificado-observacion/certificado-observacion.component';
import { CertificadoCodigoComponent } from './components/Certificado/certificado-codigo/certificado-codigo.component';
import { CertificadoValidarComponent } from './components/Certificado/certificado-validar/certificado-validar.component';
import { CertificadoInformacionComponent } from './components/Certificado/certificado-informacion/certificado-informacion.component';
import { CertificadoInformacionEstudianteComponent } from './components/Certificado/certificado-informacion-estudiante/certificado-informacion-estudiante.component';
registerLocaleData(localeES, "es");

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
    ProyectoModificarComponent,
    EstudianteModificarComponent,
    CertificadoModificarComponent,
    ParticipaListarComponent,
    AsignarDocenteComponent,
    ParticipaModificarComponent,
    AsignarEstudianteComponent,
    IntegraModificarComponent,
    ReportesListaComponent,
    ParticipaDocenteFacultadTotalComponent,
    SeleccionFacultadComponent,
    ParticipaEstudianteFacultadComponent,
    EstudiantesFacultadGeneroComponent,
    SeleccionFacultadGeneroComponent,
    CertificadosFacultadComponent,
    SeleccionObservacionComponent,
    CertificadoObservacionComponent,
    CertificadoCodigoComponent,
    CertificadoValidarComponent,
    CertificadoInformacionComponent,
    CertificadoInformacionEstudianteComponent,
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
