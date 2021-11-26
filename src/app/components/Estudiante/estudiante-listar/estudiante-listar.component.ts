import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Estudiante } from 'src/app/interfaces/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';


@Component({
  selector: 'app-estudiante-listar',
  templateUrl: './estudiante-listar.component.html',
  styleUrls: ['./estudiante-listar.component.css']
})
export class EstudianteListarComponent implements OnInit {
  listaEstudiantes!: Estudiante[];

  displayedColumns: string[] = ['cedulaEstudiante', 'nombreEstudiante', 'sexoEstudiante', 'semestre'];
  dataSource = new MatTableDataSource<Estudiante>(this.listaEstudiantes);

  constructor(private servicio: EstudianteService) { }

  ngOnInit(): void {
    this.getEstudiantes();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEstudiantes(){
    let resp = this.servicio.getEstudiantes();
    resp.subscribe(datos=>this.dataSource.data=datos as Estudiante[])
  }

}
