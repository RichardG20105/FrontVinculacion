import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocenteComponent } from './components/docente/docente.component';
import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';

const routes: Routes = [
  { path: '', component: ProyectoComponent},
  { path: 'estudiante', component: EstudianteComponent },
  { path: 'docente', component: DocenteComponent},
  { path: 'proyecto', component: ProyectoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
