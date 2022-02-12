import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Facultad } from 'src/app/interfaces/facultad';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { FacultadService } from '../../../services/facultad.service';
import { CarreraService } from '../../../services/carrera.service';
import { Carrera } from 'src/app/interfaces/carrera';

@Component({
  selector: 'app-proyecto-crear',
  templateUrl: './proyecto-crear.component.html',
  styleUrls: ['./proyecto-crear.component.css']
})
export class ProyectoCrearComponent implements OnInit {

  form: FormGroup
  facultad!: Facultad[]
  carreras!: Carrera[]
  estado: string[] = ["Vigente", "Finalizado"]
  constructor(private fb: FormBuilder,
    private service: ProyectoService,
    private servicioFacultad: FacultadService,
    private servicioCarrera: CarreraService,
    private alerta: AlertifyService,
    private dialog: MatDialogRef<ProyectoCrearComponent>) { 
    this.form = this.fb.group({
      codigo: ["", Validators.required],
      nombre: ["", Validators.required],
      resolucion: [""],
      estado: ["",Validators.required],
      facultad: ["",Validators.required],
      carrera: [[""],Validators.required]
    })
  }

  ngOnInit(): void {
    this.getFacultades()
    this.getCarreras()
  }

  getFacultades(){
    this.servicioFacultad.getFacultades().subscribe(data => {
      this.facultad = data as Facultad[];
    })
  }

  getCarreras(){
    this.servicioCarrera.getCarreras().subscribe(data => {
      this.carreras = data as Carrera[]
    })
  }
  
  guardarProyecto(){
    const proyecto: Proyecto = {
      codigo: this.form.value.codigo,
      nombreProyecto: this.form.value.nombre,
      resolucion: this.form.value.resolucion,
      estado: this.form.value.estado,
      facultad: this.form.value.facultad,
      carreras: this.form.value.carrera,
      idProyecto!:0
    }
    this.service.saveProyecto(proyecto).subscribe(() => {
      this.form.reset();
      this.alerta.success("Se ha creado el Proyecto");
      this.dialog.close();
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}
