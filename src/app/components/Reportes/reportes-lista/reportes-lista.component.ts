import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionFacultadComponent } from '../seleccion-facultad/seleccion-facultad.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeleccionFacultadGeneroComponent } from '../seleccion-facultad-genero/seleccion-facultad-genero.component';
import { SeleccionObservacionComponent } from '../seleccion-observacion/seleccion-observacion.component';

interface Props{
  id: number,
  nombre: string
}

@Component({
  selector: 'app-reportes-lista',
  templateUrl: './reportes-lista.component.html',
  styleUrls: ['./reportes-lista.component.css']
})

export class ReportesListaComponent implements OnInit {
  opcion: number = 0;
  form: FormGroup 
  opcionesReportes: Props[] = [
    {id: 1,nombre: 'Participación de Docentes por Facultad '},
    {id: 2, nombre: 'Participacion de Estudiantes por Facultad'},
    {id: 3,nombre:'Cantidad de Docentes por Facultad y Genero'},
    {id: 4,nombre:'Cantidad de Estudiantes por Facultad y Genero'},
    {id: 5,nombre:'Cantidad de Certificados por Facultad'},
    {id: 6,nombre:'Cantidad de Certificados por Observación'},
  ];

  constructor(private dialog: MatDialog,
    private fb: FormBuilder) { 
    this.form = this.fb.group({
      opcion: ["",[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  escogio(ob: any){
    this.opcion = ob.value
  }

  generarReporte(){
    switch(this.opcion){
      case 1:
        this.onDocenteFacultad();
        break;
      case 2:
        this.onEstudianteFacultad();
        break;
      case 3:
        this.onDocentesFacultadGenero();
        break;
      case 4:
        this.onEstudiantesFacultadGenero();
        break;
      case 5:
        this.onCertificadosFacultad();
        break;
      case 6:
        this.onCertificadosObservacion();
        break;
      default:
        break;
    }
  }

  onDocenteFacultad(){
    const dial = this.dialog.open(SeleccionFacultadComponent, {
      width: '35vw',
      height: '30vh',
      data: {
        opcion: 1
      }
    });
  }
  onEstudianteFacultad(){
    const dial = this.dialog.open(SeleccionFacultadComponent, {
      width: '35vw',
      height: '30vh',
      data: {
        opcion: 2
      }
    });
  }

  onDocentesFacultadGenero(){
    const dial = this.dialog.open(SeleccionFacultadGeneroComponent, {
      width: '35vw',
      height: '40vh',
      data: {
        opcion: 1
      }
    });
  }

  onEstudiantesFacultadGenero(){
    const dial = this.dialog.open(SeleccionFacultadGeneroComponent, {
      width: '35vw',
      height: '50vh',
      data: {
        opcion: 2
      }
    });
  }

  onCertificadosFacultad(){
    const dial = this.dialog.open(SeleccionFacultadComponent, {
      width: '35vw',
      height: '30vh',
      data: {
        opcion: 3
      }
    });

  }
  onCertificadosObservacion(){
    const dial = this.dialog.open(SeleccionObservacionComponent, {
      width: '35vw',
      height: '35vh'
    });
  }
}
