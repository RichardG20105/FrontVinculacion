import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Carrera } from 'src/app/interfaces/carrera';
import { Facultad } from 'src/app/interfaces/facultad';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { FacultadService } from 'src/app/services/facultad.service';
import { ProyectoService } from 'src/app/services/proyecto.service';


@Component({
  selector: 'app-proyecto-modificar',
  templateUrl: './proyecto-modificar.component.html',
  styleUrls: ['./proyecto-modificar.component.css']
})
export class ProyectoModificarComponent implements OnInit {
  form: FormGroup
  idProy: number = 0
  proyecto!: Proyecto
  facultad!: Facultad[]
  carreras!: Carrera[]
  estado: string[] = ["Vigente", "Finalizado"]
  constructor(private fb: FormBuilder,
    private service: ProyectoService,
    private servicioFacultad: FacultadService,
    private servicioCarrera: CarreraService,
    private alerta: AlertifyService,
    private dialog: MatDialogRef<ProyectoModificarComponent>,
    @Inject(MAT_DIALOG_DATA)datos: any) {
      this.idProy = datos.id;
      this.form = this.fb.group({
      codigo: [],
      nombre: [],
      facultad: [],
      carrera: [],
      resolucion: [],
      estado: []
    })
  }

  ngOnInit(): void {
    this.getFacultades()
    this.getCarreras()
    this.getProyecto(this.idProy)
  }

  getProyecto(id: number){
    let resp = this.service.getProyecto(id)
    resp.subscribe(data => {
      this.proyecto = data as Proyecto
      this.setForm()
    })
  }

  getCarreras(){
    this.servicioCarrera.getCarreras().subscribe(data => {
      this.carreras = data as Carrera[]
    })
  }

  getFacultades(){
    this.servicioFacultad.getFacultades().subscribe(data => {
      this.facultad = data as Facultad[];
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
      idProyecto!: this.idProy
    }
    this.service.updateProyecto(proyecto,this.idProy).subscribe(data => {
      this.form.reset();
      this.alerta.success("Se ha modificado el Proyecto");
      this.dialog.close();
    });
  }

  setForm(){
    this.form = this.fb.group({
      codigo: [`${this.proyecto.codigo}`, Validators.required],
      nombre: [`${this.proyecto.nombreProyecto}`, Validators.required],
      facultad: [this.proyecto.facultad,Validators.required],
      carrera: [this.proyecto.carreras, Validators.required],
      resolucion: [this.validNull(`${this.proyecto.resolucion}`)],
      estado: [`${this.proyecto.estado}`,Validators.required]
    })
  }

  CompararCarrera(Ob1: Carrera, Ob2: Carrera){
    return Ob1 && Ob2 && Ob1.idCarrera == Ob2.idCarrera;
  }

  CompararFacultad(Ob1: Facultad,Ob2: Facultad){
    return Ob1 && Ob2 && Ob1.idFacultad == Ob2.idFacultad;
  }

  validNull(validar: string){
    if(validar == "null")
      return ""
    else
      return validar;
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}

