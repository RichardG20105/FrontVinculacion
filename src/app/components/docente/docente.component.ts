import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Docente } from 'src/app/interfaces/docente';
import { DocenteService } from 'src/app/services/docente.service';


@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
  listaDocentes!: Docente[];

  displayedColumns: string[] = ['cedulaDocente', 'nombreDocente', 'sexoDocente', 'contacto', 'correoElectronico', 'relacionLaboral','acciones'];
  dataSource = new MatTableDataSource<Docente>(this.listaDocentes);
  
  constructor(private servicio: DocenteService) { }

  ngOnInit(): void {
    this.getDocentes();
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDocentes(){
    let resp = this.servicio.getDocentes();
    resp.subscribe(datos=>this.dataSource.data=datos as Docente[])
    
    /*this.servicio.getDocentes().subscribe(data =>{
      listaDocentes = data;
    }) */
  }
  
}
