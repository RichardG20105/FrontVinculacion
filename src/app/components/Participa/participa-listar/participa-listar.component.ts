import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, provideRoutes, Router } from '@angular/router';
import { Docenteproyecto } from 'src/app/interfaces/docenteproyecto';
import { ParticipaService } from '../../../services/participa.service';
import { DocenteCrearComponent } from '../../Docente/docente-crear/docente-crear.component';
import { DocenteModificarComponent } from '../../Docente/docente-modificar/docente-modificar.component';
import { Participa } from '../../../interfaces/participa';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Docente } from 'src/app/interfaces/docente';

@Component({
  selector: 'app-participa-listar',
  templateUrl: './participa-listar.component.html',
  styleUrls: ['./participa-listar.component.css']
})
export class ParticipaListarComponent implements OnInit {
  idProyecto!: number;
  listaDocentes!: Participa[];

  displayedColumns: string[] = ['cedulaDocente', 'nombreDocente','cargo','anioParticipaDoc', 'horasParticipacion','acciones'];
  dataSource = new MatTableDataSource<Participa>(this.listaDocentes);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private servicio: ParticipaService,
    private servicioProyecto: ProyectoService,
    private dialog: MatDialog,
    private router: Router,
    private activo: ActivatedRoute) { 
      this.idProyecto = Number(this.activo.snapshot.paramMap.get("id"));
    }

  ngOnInit(): void {
    this.getDocentes(this.idProyecto);
  }
  
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDocentes(id: number){
    let proy = this.servicioProyecto.getProyecto(id);
    proy.subscribe(datos => {
      let docentes = this.servicio.getDocentes(datos);
      docentes.subscribe(datos => {
        this.dataSource.data = datos as Participa[]
        console.log(datos)
      })  
    })
    /* let resp = this.servicio.getDocentes()
    resp.subscribe(datos => {
      console.log(datos)
    }) */
  }

  onCreate(){
    const dial = this.dialog.open(DocenteCrearComponent,{
      height: '95vh',
      width: '50vw'
    })
    dial.afterClosed().subscribe(data => this.getDocentes(this.idProyecto))
  }

  onEdit(idDocente: number){
    const dial = this.dialog.open(DocenteModificarComponent, {
      width: '50vw',
      height: '95vh',
      data: {
        id: idDocente
      }
    });
    dial.afterClosed().subscribe(data => this.getDocentes(this.idProyecto))
  }

}
