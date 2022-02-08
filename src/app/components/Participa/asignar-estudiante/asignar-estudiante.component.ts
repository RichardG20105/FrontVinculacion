import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProyectoService } from '../../../services/proyecto.service';
import { Proyecto } from '../../../interfaces/proyecto';
import { EstudianteCrearComponent } from '../../Estudiante/estudiante-crear/estudiante-crear.component';
import { Estudiante } from '../../../interfaces/estudiante';
import { CarreraService } from '../../../services/carrera.service';
import { Integra } from '../../../interfaces/integra';
import { IntegraService } from '../../../services/integra.service';
import { AlertifyService } from '../../../services/alertify.service';
import { EstudianteService } from '../../../services/estudiante.service';

@Component({
  selector: 'app-asignar-estudiante',
  templateUrl: './asignar-estudiante.component.html',
  styleUrls: ['./asignar-estudiante.component.css']
})
export class AsignarEstudianteComponent implements OnInit {

  encontrado = false;
  clic = false;
  texto = false;
  proyecto!: Proyecto;
  estudiante!: Estudiante;
  idProy!: number;
  carrera!: string;
  form: FormGroup;
  fecha!: Date;

  constructor(
    private servicioIntegra: IntegraService,
    private servicioEstudiante: EstudianteService,
    private servicioProyecto: ProyectoService,
    private servicioCarrera: CarreraService,
    private alerta: AlertifyService,
    private fb: FormBuilder,
    private dialog: MatDialogRef<AsignarEstudianteComponent>,
    private dialogoCrear: MatDialog,
    @Inject(MAT_DIALOG_DATA) datos: any) { 
      this.idProy = datos.id;
      this.form = this.fb.group({
        cedula: ["",[Validators.required,Validators.minLength(10), Validators.pattern("^[0-9]*$")]]
      })
      this.servicioProyecto.getProyecto(this.idProy).subscribe(data => {
        this.proyecto = data;
      })
    }

  onTexto(event: any): void{
    this.encontrado = false;
    this.clic = false;
    if(event.target.value != '')
      this.texto = true;
    else
      this.texto = false;
  }

  ngOnInit(): void {
  }

  onBuscar(){
    let resp = this.servicioEstudiante.getEstudianteCedula(this.form.value.cedula);
    resp.subscribe(datos => {
      this.estudiante = datos;
      this.encontrado = true;
      this.clic = true;
      this.definirCarrera();
    })
  }

  onEncontrado(){
    return this.encontrado;
  }

  onCliceado(){
    return this.clic
  }
  
  tocoTexto(){
    return this.texto;
  }

  onCrear(){
    const dial = this.dialogoCrear.open(EstudianteCrearComponent,{
      height: '75vh',
      width: '50vw'
    })
    dial.afterClosed().subscribe(data => this.estudianteParticipa(data))
  }

  estudianteParticipa(data: Estudiante){
    this.estudiante = data;
    let resp = this.servicioCarrera.getCarrera(this.estudiante.idCarrera);
    resp.subscribe(datos => {
      this.carrera = datos.nombreCarrera
      
      const integra: Integra = {
        idIntegra: 0,
        carrera: this.carrera,
        formaParticipacion: '',
        anioParticipaEst: this.fecha,
        estudiante: this.estudiante,
        proyecto: this.proyecto
      }
      this.guardarIntegra(integra);
    })
  }

  asignarEstudiante(){
    const integra: Integra = {
      idIntegra: 0,
      carrera: this.carrera,
      formaParticipacion: '',
      anioParticipaEst: this.fecha,
      estudiante: this.estudiante,
      proyecto: this.proyecto
    }
    this.guardarIntegra(integra);
  }

  guardarIntegra(integra: Integra){
    this.servicioIntegra.saveIntegra(integra).subscribe(data => {
      this.form.reset();
      this.alerta.success("Se ha asignado el Estudiante");
      this.dialog.close();
    })
  }

  definirCarrera(){
    let resp = this.servicioCarrera.getCarrera(this.estudiante.idCarrera);
    resp.subscribe(datos => this.carrera = datos.nombreCarrera)
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}
