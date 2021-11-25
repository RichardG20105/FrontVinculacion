import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  listaProyectos!: Proyecto[]

  displayedColumns: string[] = ['codigo','nombreProyecto','resolucion','acciones']
  dataSource = new MatTableDataSource<Proyecto>(this.listaProyectos);
  
  constructor(private servicio: ProyectoService) { }

  ngOnInit(): void {
    this.getProyectos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getProyectos(){
    let resp = this.servicio.getProyectos();
    resp.subscribe(datos => this.dataSource.data = datos as Proyecto[])
  }

}
