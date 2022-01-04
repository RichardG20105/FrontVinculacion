import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { MatDialog } from '@angular/material/dialog';
import { ProyectoCrearComponent } from '../proyecto-crear/proyecto-crear.component';
import { Router } from '@angular/router';
import { ProyectoModificarComponent } from '../proyecto-modificar/proyecto-modificar.component';

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
  
  constructor(private servicio: ProyectoService, 
    private dialog: MatDialog,
    private router: Router,
    private alerta: AlertifyService) { }

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
    resp.subscribe(datos => {
      this.dataSource.data = datos as Proyecto[]
      console.log(datos)
    })
  }

  onCreate(){
    const dial = this.dialog.open(ProyectoCrearComponent,{
      height: '70vh',
      width: '50vw'
    })
    dial.afterClosed().subscribe(data => {
      this.getProyectos();
    });
  }

  onEdit(idProyecto: number){
    const dial = this.dialog.open(ProyectoModificarComponent, {
      width: '50vw',
      height: '95vh',
      data:{
        id: idProyecto
      }
    });
    dial.afterClosed().subscribe(data => this.getProyectos())
  }

  onListado(idProyecto: number){
    this.router.navigate(['/verproyecto',{id: idProyecto}]);
  }
}
