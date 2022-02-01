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
import { MatSort } from '@angular/material/sort';
import { MatTableFilter } from 'mat-table-filter';
import { IntegraModificarComponent } from '../integra-modificar/integra-modificar.component';
import Alert from 'sweetalert2';
import { CertificadoService } from 'src/app/services/certificado.service';
import { Certificado } from 'src/app/interfaces/certificado';
import { CarreraService } from '../../../services/carrera.service';
import { FacultadService } from '../../../services/facultad.service';

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

  nombreFacultad!: String
  filterType!: MatTableFilter;

  displayedColumns: string[] = ['cedulaDocente', 'nombreDocente','contacto','correoElectronico','facultad','anioParticipaDoc', 'horasParticipacion','acciones'];
  displayedColumnsEstudiantes: string[] = ['cedulaEstudiante', 'nombreEstudiante','carrera','semestre','formaParticipacion','anioParticipaEst','acciones']
  
  dataSourceDocentes = new MatTableDataSource<Participa>(this.listaDocentes);
  @ViewChild('TablaUnoPaginador',{static: true}) tablaUnoPaginador!: MatPaginator;
  @ViewChild('TablaUnoSort',{static: true}) tablaUnoSort!: MatSort;
  
  dataSourceEstudiantes = new MatTableDataSource<Integra>(this.listaEstudiantes);
  @ViewChild('TablaDosPaginador',{static: true}) tablaDosPaginador!: MatPaginator;
  @ViewChild('TablaDosSort',{static: true}) tablaDosSort!: MatSort;

  constructor(private servicio: ParticipaService,
    private servicioProyecto: ProyectoService,
    private servicioIntegra: IntegraService,
    private servicioCertificado: CertificadoService,
    private servicioCarrera: CarreraService,
    private servicioFacultad: FacultadService,
    private dialog: MatDialog,
    private activo: ActivatedRoute) { 
      this.idProyecto = Number(this.activo.snapshot.paramMap.get("id"));
    }

  ngOnInit(): void {
    this.getProyecto(this.idProyecto);
    this.getCoordinador(this.idProyecto);
    this.getDocentes(this.idProyecto);
    this.getEstudiantes(this.idProyecto);
    this.filtroDocente();
    this.filtroEstudiante();
  }

  filtroDocente(){
    const defaultPredicate = this.dataSourceDocentes.filterPredicate;
    this.dataSourceDocentes.filterPredicate = function (data, filter: string): boolean {
      return data.docente.nombreDocente.toLowerCase().includes(filter) || data.docente.cedulaDocente.toLowerCase().includes(filter) ||
      data.facultad.toLowerCase().includes(filter) || defaultPredicate(data, filter);
    };
  }

  filtroEstudiante(){
    const defaultPredicate = this.dataSourceEstudiantes.filterPredicate;
    this.dataSourceEstudiantes.filterPredicate = function (data,filter:string): boolean {
      return data.estudiante.cedulaEstudiante.toLowerCase().includes(filter) || data.estudiante.nombreEstudiante.toLowerCase().includes(filter) ||
      data.estudiante.semestre.toLowerCase().includes(filter) || defaultPredicate(data,filter);
    }
  }
  
  ngAfterViewInit(){
    this.dataSourceDocentes.paginator = this.tablaUnoPaginador;
    this.dataSourceDocentes.sort = this.tablaUnoSort
    this.dataSourceEstudiantes.paginator = this.tablaDosPaginador;
    this.dataSourceEstudiantes.sort = this.tablaDosSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDocentes.filter = filterValue.trim().toLowerCase();
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
        this.dataSourceDocentes.data = datos as Participa[]
        this.docentesFind = true
      })
    })
  }

  getEstudiantes(id: number){
    let proy = this.servicioProyecto.getProyecto(id);
    proy.subscribe(datos => {
      let estudiantes = this.servicioIntegra.getEstudiantes(datos);
      estudiantes.subscribe(datos => {
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

  onCertificadoDocente(idParticipa: number){
    Alert.fire({
      title: '¿Desea generar el certificado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.isConfirmed){
        var Fecha: Date;
        var Integra: Integra
        let res = this.servicio.getParticipa(idParticipa);
        res.subscribe(data => {
          const certificado: Certificado = {
            idCertificado: 0,
            fechaEntrega: Fecha,
            fechaRecepcion: Fecha,
            observacionCertificado: '',
            facultadIntegrante: data.facultad,
            integra: Integra,
            participa: data,
          }
          this.servicioCertificado.saveCertificado(certificado).subscribe(data => {
            if(data){
              Alert.fire(
                'Generado!',
                'El certificado del Docente se genero',
                'success'
              )
            }
          })
        })
      }
    })
  }

  onEdit(idParticipacion: number){
    const dial = this.dialog.open(ParticipaModificarComponent, {
      width: '50vw',
      height: '62vh',
      data: {
        id: idParticipacion
      }
    });
    dial.afterClosed().subscribe(() => this.getDocentes(this.idProyecto))
  }

  onDelete(idParticipacion: number){
    Alert.fire({
      title: 'Desea eliminar la Participación del Docente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo',
      cancelButtonText: 'No, cancela'
    }).then((result) => {
      if(result.isConfirmed){
        this.servicio.deleteParticipa(idParticipacion).subscribe(data => {
          this.getDocentes(this.idProyecto);
          if(data){
            Alert.fire(
              'Eliminado!',
              'El docente se elimino del proyecto',
              'success'
            )
          }
        });
      }
    })
  }

  onCertificadoEstudiante(idIntegra: number){
    Alert.fire({
      title: '¿Desea generar el certificado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.isConfirmed){
        var Fecha: Date;
        var Participa: Participa
        let res = this.servicioIntegra.getIntegra(idIntegra);
        res.subscribe(data => {
          let resp = this.servicioCarrera.getFacultad(data.estudiante.idCarrera);
          resp.subscribe(dato => {
            let resultado = this.servicioFacultad.getFacultad(dato);
            resultado.subscribe(facultad => {
              this.nombreFacultad = facultad.nombreFacultad
              const certificado: Certificado = {
                idCertificado: 0,
                fechaEntrega: Fecha,
                fechaRecepcion: Fecha,
                observacionCertificado: '',
                facultadIntegrante: this.nombreFacultad,
                integra: data,
                participa: Participa,
              }
              this.servicioCertificado.saveCertificado(certificado).subscribe(data => {
                if(data){
                  Alert.fire(
                    'Generado!',
                  'El certificado de estudiante se genero',
                  'success'
                )
              }
              })
            });
          })
        })
      }
    })
  }

  onEditEstudiante(idIntegra: number){
    const dial = this.dialog.open(IntegraModificarComponent, {
      width: '50vw',
      height: '68vh',
      data: {
        id: idIntegra
      }
    });
    dial.afterClosed().subscribe(() => this.getEstudiantes(this.idProyecto))
  }
  
  onDeleteEstudiante(idIntegra: number){
    Alert.fire({
      title: 'Desea eliminar la Participación del Estudiante',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo',
      cancelButtonText: 'No, cancela'
    }).then((result) => {
      if(result.isConfirmed){
        this.servicioIntegra.deleteIntegra(idIntegra).subscribe(data => {
          this.getEstudiantes(this.idProyecto);
          if(data){
            Alert.fire(
              'Eliminado!',
              'El estudiante se elimino del proyecto',
              'success'
            )
          }
        });
      }
    })
  }
}