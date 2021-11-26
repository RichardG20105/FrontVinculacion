import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocenteComponent } from './components/docente/docente.component';
import { EstudianteListarComponent } from './components/Estudiante/estudiante-listar/estudiante-listar.component';
import { ProyectoListarComponent } from './components/Proyecto/proyecto-listar/proyecto-listar.component';

const routes: Routes = [
  { path: '', component: ProyectoListarComponent},
  { path: 'estudiante', component: EstudianteListarComponent },
  { path: 'docente', component: DocenteComponent},
  { path: 'proyecto', component: ProyectoListarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
