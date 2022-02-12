import { Component, Inject, OnInit } from '@angular/core';
import { Carrera } from 'src/app/interfaces/carrera';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarreraService } from '../../../services/carrera.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProyectosCarreraComponent } from '../proyectos-carrera/proyectos-carrera.component';

@Component({
  selector: 'app-seleccion-carrera',
  templateUrl: './seleccion-carrera.component.html',
  styleUrls: ['./seleccion-carrera.component.css']
})
export class SeleccionCarreraComponent implements OnInit {
  Carreras!: Carrera[]
  form: FormGroup
  carrera!: string
  constructor(private servicioCarrera: CarreraService,
    private fb: FormBuilder,
    private dialog: MatDialog) { 
      this.form  =this.fb.group({
        opcion: ["",Validators.required]
      })
    }

  ngOnInit(): void {
    this.getCarreras();
  }

  getCarreras(){
    let res = this.servicioCarrera.getCarreras()
    res.subscribe(data => {
      this.Carreras = data as Carrera[]
    })
  }

  escogio(ob: any){
    this.carrera = ob.value
  }

  PDF(){
    this.dialog.open(ProyectosCarreraComponent, {
      width: '50vw',
      height: '50vh',
      data:{
        carrera: this.carrera
      }
    })
  }

}
