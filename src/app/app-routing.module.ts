import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocenteListarComponent } from './components/Docente/docente-listar/docente-listar.component';
import { EstudianteListarComponent } from './components/Estudiante/estudiante-listar/estudiante-listar.component';
import { ProyectoListarComponent } from './components/Proyecto/proyecto-listar/proyecto-listar.component';
import { CertificadoListarComponent } from './components/Certificado/certificado-listar/certificado-listar.component';
import { ParticipaListarComponent } from './components/Participa/participa-listar/participa-listar.component';

const routes: Routes = [
  { path: '', component: ProyectoListarComponent},
  { path: 'estudiante', component: EstudianteListarComponent },
  { path: 'docente', component: DocenteListarComponent},
  { path: 'proyecto', component: ProyectoListarComponent},
  { path: 'certificado', component: CertificadoListarComponent},
  { path: 'reporte', component: CertificadoListarComponent},
  { path: 'verproyecto/:id', component: ParticipaListarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
