import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Docente } from 'src/app/interfaces/docente';
import { AlertifyService } from 'src/app/services/alertify.service';
import { DocenteService } from 'src/app/services/docente.service';
import { Participa } from '../../../interfaces/participa';
import { CarreraService } from '../../../services/carrera.service';
import { FacultadService } from '../../../services/facultad.service';
import { ParticipaService } from '../../../services/participa.service';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { ProyectoService } from '../../../services/proyecto.service';
import { DocenteCrearComponent } from '../../Docente/docente-crear/docente-crear.component';

@Component({
  selector: 'app-asignar-docente',
  templateUrl: './asignar-docente.component.html',
  styleUrls: ['./asignar-docente.component.css']
})
export class AsignarDocenteComponent implements OnInit {

  participa!: Participa;
  docente!: Docente;
  facultad!: string;
  proyecto!: Proyecto;
  encontrado = false;
  clic = false;
  form : FormGroup
  idFacu!: number;
  idProy!: number;
  cargo: string = '';
  texto: boolean = false;

  fecha!: Date;
  hora!: number

  constructor(
    private servicioDocente: DocenteService,
    private servicioCarrera: CarreraService,
    private servicioFacultad: FacultadService,
    private servicioParticipa: ParticipaService,
    private servicioProyecto: ProyectoService,
    private alerta: AlertifyService,
    private fb: FormBuilder,
    private dialog: MatDialogRef<AsignarDocenteComponent>,
    private dialogoCrear: MatDialog,
    @Inject(MAT_DIALOG_DATA) datos:any) { 
      this.idProy = datos.id;
      this.cargo = datos.cargo;
      this.form = this.fb.group({
        cedula: ["", [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]]
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
    let resp = this.servicioDocente.getDocenteCedula(this.form.value.cedula);
    resp.subscribe(datos => {
      this.docente = datos;
      this.encontrado = true;
      this.clic = true;
      this.definirFacultad();
    });
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
    const dial = this.dialogoCrear.open(DocenteCrearComponent,{
      height: '90vh',
      width: '50vw'
    })
    dial.afterClosed().subscribe(data => this.docenteParticipa(data))
  }

  docenteParticipa(data: Docente){
    this.docente = data;
    let resp = this.servicioCarrera.getFacultad(this.docente.idCarrera);
    resp.subscribe(data => {
      let res = this.servicioFacultad.getFacultad(data)
      res.subscribe(datos => {
        this.facultad = datos.nombreFacultad;
        const participa: Participa = {
          idParticipa: 0,
          cargo: this.cargo,
          facultad: this.facultad,
          participacionInicio: this.fecha,
          participacionFinal: this.fecha,
          horasParticipacion: this.hora,
          docente: this.docente,
          proyecto: this.proyecto
        }
        this.guardarParticipacion(participa);
      })
    })
  }

  asignarDocente(){
    const participa: Participa = {
      idParticipa: 0,
      cargo: this.cargo,
      facultad: this.facultad,
      participacionInicio: this.fecha,
      participacionFinal: this.fecha,
      horasParticipacion: this.hora,
      docente: this.docente,
      proyecto: this.proyecto,
    }
    this.guardarParticipacion(participa);
  }

  guardarParticipacion(participa : Participa){
    this.servicioParticipa.saveParticipa(participa).subscribe(() => {
      this.form.reset();
      this.alerta.success("Se ha asignado el Docente")
      this.dialog.close();
    })
  }

  definirFacultad(){
    let resp = this.servicioCarrera.getFacultad(this.docente.idCarrera);
    resp.subscribe(data => {
      let res = this.servicioFacultad.getFacultad(data)
      res.subscribe(datos => {
        this.facultad = datos.nombreFacultad;
      })
    })
  }
  
  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}