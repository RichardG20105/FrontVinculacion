import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Docente } from 'src/app/interfaces/docente';
import { DocenteService } from 'src/app/services/docente.service';
import { DocenteCrearComponent } from '../docente-crear/docente-crear.component';

@Component({
  selector: 'app-docente-listar',
  templateUrl: './docente-listar.component.html',
  styleUrls: ['./docente-listar.component.css']
})
export class DocenteListarComponent implements OnInit {

  listaDocentes!: Docente[];

  displayedColumns: string[] = ['cedulaDocente', 'nombreDocente', 'sexoDocente', 'contacto', 'correoElectronico', 'relacionLaboral','acciones'];
  dataSource = new MatTableDataSource<Docente>(this.listaDocentes);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private servicio: DocenteService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.getDocentes();
  }
  
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDocentes(){
    let resp = this.servicio.getDocentes();
    resp.subscribe(datos => this.dataSource.data=datos as Docente[])
  }

  onCreate(){
    const dial = this.dialog.open(DocenteCrearComponent,{
      height: '95vh',
      width: '50vw'
    })
    dial.afterClosed().subscribe(data => this.getDocentes())
  }

}
