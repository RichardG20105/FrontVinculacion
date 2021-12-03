import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocenteListarComponent } from './components/Docente/docente-listar/docente-listar.component';
import { EstudianteListarComponent } from './components/Estudiante/estudiante-listar/estudiante-listar.component';
import { ProyectoListarComponent } from './components/Proyecto/proyecto-listar/proyecto-listar.component';
import { CertificadoListarComponent } from './components/Certificado/certificado-listar/certificado-listar.component';

const routes: Routes = [
  { path: '', component: ProyectoListarComponent},
  { path: 'estudiante', component: EstudianteListarComponent },
  { path: 'docente', component: DocenteListarComponent},
  { path: 'proyecto', component: ProyectoListarComponent},
  { path: 'certificado', component: CertificadoListarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
