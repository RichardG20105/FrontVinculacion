import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

import { Certificado } from 'src/app/interfaces/certificado';

@Component({
  selector: 'app-certificado-listar',
  templateUrl: './certificado-listar.component.html',
  styleUrls: ['./certificado-listar.component.css']
})
export class CertificadoListarComponent implements OnInit {
  listaCertificados!: Certificado[];
  
  displayedColumns: string[] = ['nombreIntegrante', 'nombreFacultad', 'nombreProyecto', 'fechaRecepcion', 'fechaEntrega', 'observacion', 'acciones'];
  dataSource = new MatTableDataSource<Certificado>(this.listaCertificados);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog, 
    private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate(){
    
  }

}
