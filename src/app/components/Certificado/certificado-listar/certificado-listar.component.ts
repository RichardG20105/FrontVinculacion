import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

import { Certificado } from 'src/app/interfaces/certificado';
import { CertificadoService } from '../../../services/certificado.service';
import { CertificadoModificarComponent } from '../certificado-modificar/certificado-modificar.component';
import { CertificadoValidarComponent } from '../certificado-validar/certificado-validar.component';

@Component({
  selector: 'app-certificado-listar',
  templateUrl: './certificado-listar.component.html',
  styleUrls: ['./certificado-listar.component.css']
})
export class CertificadoListarComponent implements OnInit {
  listaCertificadosEstudiantes!: Certificado[];
  listaCertificadosDocentes!: Certificado[];
  certEstudiantesFind: Boolean = false;
  certDocentesFind: Boolean = false;
  
  displayedColumnsEstudiantes: string[] = ['nombreIntegrante', 'nombreCarrera', 'nombreProyecto', 'fechaRecepcion', 'fechaEntrega', 'observacion', 'acciones'];
  displayedColumnsDocentes: string[] = ['nombreDocente', 'nombreFacultad', 'nombreProyecto', 'fechaRecepcion', 'fechaEntrega', 'observacion', 'acciones'];
  
  dataSourceEstudiantes = new MatTableDataSource<Certificado>(this.listaCertificadosEstudiantes);
  @ViewChild('TablaUnoPaginador',{static: true})tablaUnoPaginador!: MatPaginator;
  @ViewChild('TablaUnoSort',{static: true}) tablaUnoSort!: MatSort;
  
  dataSourceDocentes = new MatTableDataSource<Certificado>(this.listaCertificadosDocentes);
  @ViewChild('TablaDosPaginador',{static: true})tablaDosPaginador!: MatPaginator;
  @ViewChild('TablaDosSort',{static: true}) tablaDosSort!: MatSort;


  constructor(
    private servicio: CertificadoService,
    private dialog: MatDialog, 
    private router: Router) { }

  ngOnInit(): void {
    this.getCertificadosDocentes();
    this.getCertificadosEstudiantes();
    this.filtroDocente();
    this.filtroEstudiante();
  }

  ngAfterViewInit() {
    this.dataSourceEstudiantes.paginator = this.tablaUnoPaginador;
    this.dataSourceEstudiantes.sort = this.tablaUnoSort;
    this.dataSourceDocentes.paginator = this.tablaDosPaginador;
    this.dataSourceDocentes.sort = this.tablaDosSort;
  }

  filtroDocente(){
    const defaultPredicate = this.dataSourceDocentes.filterPredicate;
    this.dataSourceDocentes.filterPredicate = function (data, filter: string): boolean{
      return data.participa.docente.nombreDocente.toLowerCase().includes(filter) || data.participa.facultad.toLowerCase().includes(filter) || 
      data.participa.proyecto.nombreProyecto.toLowerCase().includes(filter) ||defaultPredicate(data, filter);
    }
  }

  filtroEstudiante(){
    const defaultPredicate = this.dataSourceEstudiantes.filterPredicate;
    this.dataSourceEstudiantes.filterPredicate = function(data,filter: string):boolean{
      return data.integra.estudiante.nombreEstudiante.toLowerCase().includes(filter) || data.integra.carrera.toLowerCase().includes(filter) ||
      data.integra.proyecto.nombreProyecto.toLowerCase().includes(filter) || defaultPredicate(data,filter);
    }
  }

  applyFilterDocentes(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDocentes.filter = filterValue.trim().toLowerCase();
  }

  applyFilterEstudiantes(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEstudiantes.filter = filterValue.trim().toLowerCase();
  }

  validarCodigo(){
    this.dialog.open(CertificadoValidarComponent, {
      height: '35vh',
      width: '25vw',
    })
  }
  getCertificadosDocentes(){
    let resp = this.servicio.getCertificadosDocentes();
    resp.subscribe(data => {
      this.dataSourceDocentes.data = data as Certificado[];
      this.certDocentesFind = true;
    })
  }
  getCertificadosEstudiantes(){
    let res = this.servicio.getCertificadosEstudiantes();
    res.subscribe(data => {
      this.dataSourceEstudiantes.data = data as Certificado[];
      this.certEstudiantesFind = true;
    })
  }

  onEditCertificado(idCertificado: number){
    const dial = this.dialog.open(CertificadoModificarComponent, {
      width: '50vw',
      height: '93vh',
      data: {
        id: idCertificado
      }
    });
    dial.afterClosed().subscribe(() => {this.getCertificadosDocentes(), this.getCertificadosEstudiantes()})
  }
}
