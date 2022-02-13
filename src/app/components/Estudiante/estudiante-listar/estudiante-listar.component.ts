import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

import { Estudiante } from 'src/app/interfaces/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { EstudianteCrearComponent } from '../estudiante-crear/estudiante-crear.component';
import { EstudianteModificarComponent } from '../estudiante-modificar/estudiante-modificar.component';


@Component({
  selector: 'app-estudiante-listar',
  templateUrl: './estudiante-listar.component.html',
  styleUrls: ['./estudiante-listar.component.css']
})
export class EstudianteListarComponent implements OnInit {
  
  listaEstudiantes!: Estudiante[];
  estudiantesFind: Boolean = false

  displayedColumns: string[] = ['cedulaEstudiante', 'nombreEstudiante', 'sexoEstudiante', 'semestre', 'acciones'];
  dataSource = new MatTableDataSource<Estudiante>(this.listaEstudiantes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private servicio: EstudianteService,
    private dialog: MatDialog, 
    private router: Router) { }

  ngOnInit(): void {
    this.getEstudiantes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEstudiantes(){
    let resp = this.servicio.getEstudiantes();
    resp.subscribe(datos=> {
      this.dataSource.data=datos as Estudiante[]
      this.estudiantesFind = true;
    },() => this.estudiantesFind = false)
  }

  onCreate(){
    const dial = this.dialog.open(EstudianteCrearComponent,{
      width: '95vh',
      height: '50vw'
    });

    dial.afterClosed().subscribe(data => this.getEstudiantes())
  }

  onEdit(idEstudiante: number){
    const dial = this.dialog.open(EstudianteModificarComponent, {
      width: '50vw',
      height: '78vh',
      data: {
        id: idEstudiante
      }
    });
    dial.afterClosed().subscribe(data => this.getEstudiantes())
  }

}
