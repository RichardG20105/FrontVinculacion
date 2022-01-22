import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ParticipaService } from '../../../services/participa.service';
import { Participa } from '../../../interfaces/participa';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { AsignarDocenteComponent } from '../asignar-docente/asignar-docente.component';
import { ParticipaModificarComponent } from '../participa-modificar/participa-modificar.component';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { Integra } from 'src/app/interfaces/integra';
import { IntegraService } from 'src/app/services/integra.service';
import { AsignarEstudianteComponent } from '../asignar-estudiante/asignar-estudiante.component';

@Component({
  selector: 'app-participa-listar',
  templateUrl: './participa-listar.component.html',
  styleUrls: ['./participa-listar.component.css']
})
export class ParticipaListarComponent implements OnInit {
  idProyecto!: number;
  listaDocentes!: Participa[];
  listaEstudiantes!: Integra[];
  proyectoInfo!: Proyecto;
  coordinador!: Participa;
  proyectoFind: Boolean = false
  coordinadorFind: Boolean = false
  docentesFind: Boolean = false
  estudiantesFind: Boolean = false

  displayedColumns: string[] = ['cedulaDocente', 'nombreDocente','contacto','correoElectronico','facultad','anioParticipaDoc', 'horasParticipacion','acciones'];
  displayedColumnsEstudiantes: string[] = ['cedulaEstudiante', 'nombreEstudiante','carrera','semestre','formaParticipacion','anioParticipaEst','acciones']
  dataSource = new MatTableDataSource<Participa>(this.listaDocentes);
  dataSourceEstudiantes = new MatTableDataSource<Integra>(this.listaEstudiantes);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;

  constructor(private servicio: ParticipaService,
    private servicioProyecto: ProyectoService,
    private servicioIntegra: IntegraService,
    private dialog: MatDialog,
    private activo: ActivatedRoute) { 
      this.idProyecto = Number(this.activo.snapshot.paramMap.get("id"));
    }

  ngOnInit(): void {
    this.getProyecto(this.idProyecto);
    this.getCoordinador(this.idProyecto);
    this.getDocentes(this.idProyecto);
    this.getEstudiantes(this.idProyecto);
  }
  
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSourceEstudiantes.paginator = this.paginator2;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterEstudiantes(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEstudiantes.filter = filterValue.trim().toLowerCase();
  }

  getProyecto(id: number){
    let proy = this.servicioProyecto.getProyecto(id);
    proy.subscribe(datos => {
      this.proyectoInfo = datos as Proyecto;
      this.proyectoFind = true;
    })
  }

  getDocentes(id: number){
    let proy = this.servicioProyecto.getProyecto(id);
    proy.subscribe(datos => {
      let docentes = this.servicio.getDocentes(datos);
      docentes.subscribe(datos => {
        this.dataSource.data = datos as Participa[]
        this.docentesFind = true
      })
    })
  }

  getEstudiantes(id: number){
    let proy = this.servicioProyecto.getProyecto(id);
    proy.subscribe(datos => {
      let estudiantes = this.servicioIntegra.getEstudiantes(datos);
      estudiantes.subscribe(datos => {
        console.log(datos);
        this.dataSourceEstudiantes.data = datos as Integra[];
        this.estudiantesFind = true;
      })
    })
  }

  getCoordinador(id: number){
    let proy = this.servicioProyecto.getProyecto(id);
    proy.subscribe(datos => {
      let coord = this.servicio.getCoordinador(datos);
      coord.subscribe(datos => {
        this.coordinador = datos as Participa;
        this.coordinadorFind = true;
      })
    })
  }

  addCoordinador(){
    const dial = this.dialog.open(AsignarDocenteComponent,{
      height: '55vh',
      width: '30vw',
      data: {
        id: this.idProyecto,
        cargo: 'Coordinador'
      }
    })
    dial.afterClosed().subscribe(() => {this.getDocentes(this.idProyecto),this.getCoordinador(this.idProyecto)})
  }
  onCreate(){
    const dial = this.dialog.open(AsignarDocenteComponent,{
      height: '55vh',
      width: '30vw',
      data: {
        id: this.idProyecto,
        cargo: 'Integrante'
      }
    })
    dial.afterClosed().subscribe(() => this.getDocentes(this.idProyecto))
  }

  onCreateEstudiante(){
    const dial = this.dialog.open(AsignarEstudianteComponent,{
      height: '55vh',
      width: '30vw',
      data: {
        id: this.idProyecto
      }
    })
    dial.afterClosed().subscribe(() => this.getEstudiantes(this.idProyecto))
  }

  onEdit(idParticipacion: number){
    const dial = this.dialog.open(ParticipaModificarComponent, {
      width: '50vw',
      height: '95vh',
      data: {
        id: idParticipacion
      }
    });
    dial.afterClosed().subscribe(() => this.getDocentes(this.idProyecto))
  }
}