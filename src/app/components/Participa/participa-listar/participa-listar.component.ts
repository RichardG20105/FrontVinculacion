import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Docenteproyecto } from 'src/app/interfaces/docenteproyecto';
import { ParticipaService } from '../../../services/participa.service';
import { DocenteCrearComponent } from '../../Docente/docente-crear/docente-crear.component';
import { DocenteModificarComponent } from '../../Docente/docente-modificar/docente-modificar.component';
import { Participa } from '../../../interfaces/participa';

@Component({
  selector: 'app-participa-listar',
  templateUrl: './participa-listar.component.html',
  styleUrls: ['./participa-listar.component.css']
})
export class ParticipaListarComponent implements OnInit {
  idProyecto!: number;
  listaDocentes!: Docenteproyecto[];

  displayedColumns: string[] = ['cedulaDocente', 'nombreDocente', 'contacto', 'correoElectronico', 'anioParticipacion', 'horas','acciones'];
  dataSource = new MatTableDataSource<Docenteproyecto>(this.listaDocentes);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private servicio: ParticipaService,
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
    let i = 1;
    let listado: Docenteproyecto[]
    let resp = this.servicio.getDocentes(id);
    resp.subscribe(datos => {
      /*for(let i = 0; i <= datos.length; i++){
        listado. = datos[i].idCarrera
      }*/
      this.dataSource.data=datos,console.log(listado)
    })
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
