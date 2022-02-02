import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionFacultadComponent } from '../seleccion-facultad/seleccion-facultad.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
        break;
      default:
        break;
    }
  }

  onDocenteFacultad(){
    const dial = this.dialog.open(SeleccionFacultadComponent, {
      width: '50vw',
      height: '62vh',
      data: {
        opcion: 1
      }
    });
  }
}
