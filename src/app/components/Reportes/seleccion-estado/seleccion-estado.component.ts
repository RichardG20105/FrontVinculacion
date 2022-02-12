import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProyectosEstadoComponent } from '../proyectos-estado/proyectos-estado.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-seleccion-estado',
  templateUrl: './seleccion-estado.component.html',
  styleUrls: ['./seleccion-estado.component.css']
})
export class SeleccionEstadoComponent implements OnInit {
  form: FormGroup
  estado!: string
  Estados: string[] = ["Vigente", "Finalizado"]
  constructor(private fb: FormBuilder,
    private dialog: MatDialog) {
    this.form = this.fb.group({
      opcion: ["",Validators.required]
    })
   }

  ngOnInit(): void {
  }

  escogio(ob: any){
    this.estado = ob.value;
  }

  PDF(){
    this.dialog.open(ProyectosEstadoComponent,{
      width: '50vw',
      height: '50vh',
      data:{
        estado: this.estado
      }
    })
  }
}
