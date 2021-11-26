import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proyecto-listar',
  templateUrl: './proyecto-listar.component.html',
  styleUrls: ['./proyecto-listar.component.css']
})
export class ProyectoListarComponent implements OnInit {

  listaProyectos!: Proyecto[]

  displayedColumns: string[] = ['codigo','nombreProyecto','resolucion','acciones']
  dataSource = new MatTableDataSource<Proyecto>(this.listaProyectos);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private servicio: ProyectoService) { }

  ngOnInit(): void {
    this.getProyectos();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
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
