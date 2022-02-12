import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from '../../../services/alertify.service';
import { IntegraService } from '../../../services/integra.service';
import { Integra } from '../../../interfaces/integra';

@Component({
  selector: 'app-integra-modificar',
  templateUrl: './integra-modificar.component.html',
  styleUrls: ['./integra-modificar.component.css']
})
export class IntegraModificarComponent implements OnInit {
  formaParticipacion: any[] = ["Parte de Asignatura","Prácticas Comunitarias","Prácticas Preprofesionales", "Trabajo de Integración Curricular"]
  idIntegra!: number
  form!: FormGroup
  integraEstudiante!: Integra
  modifico = false;
  fechaMaxima = new Date();
  fechaInicio!:Date
  fechaFin!:Date

  constructor(private fb: FormBuilder,
    private servicioIntegra: IntegraService,
    private adaptadorFecha: DateAdapter<Date>,
    private alerta: AlertifyService,
    private dialog: MatDialogRef<IntegraModificarComponent>,
    @Inject(MAT_DIALOG_DATA)datos:any) { 
      this.idIntegra = datos.id;
      this.adaptadorFecha.setLocale('en-GB');
      this.form = this.fb.group({
        cedula: [],
        nombre: [],
        formaParticipacion: [],
        integraInicio: [],
        integraFinal: [],
      })
    }

  ngOnInit(): void {
    this.getIntegraEstudiante();
  }

  modificoAlgo(){
    this.modifico = true;
  }

  getModifico(){
    return this.modifico
  }
  
  getIntegraEstudiante(){
    let resp = this.servicioIntegra.getIntegra(this.idIntegra);
    resp.subscribe(data => {
      this.integraEstudiante = data as Integra,
      this.setForm()
    })
  }

  setForm(){
    this.form = this.fb.group({
      cedula: [`${this.integraEstudiante.estudiante.cedulaEstudiante}`],
      nombre: [`${this.integraEstudiante.estudiante.nombreEstudiante}`],
      formaParticipacion: [`${this.integraEstudiante.formaParticipacion}`,Validators.required],
      integraInicio: [`${this.integraEstudiante.integraInicio}`,Validators.required],
      integraFinal: [`${this.integraEstudiante.integraFinal}`],
    })

    this.setFechaInicio(new Date(this.integraEstudiante.integraInicio))
    this.setFechaFin(new Date(this.integraEstudiante.integraFinal))
  }

  modificoFechaInicio(){
    this.modifico = true;
    this.setFechaInicio(this.form.value.integraInicio)
    if(this.fechaFin < this.fechaInicio){
      this.alerta.error("La Fecha de Inicio debe ser mayor que la de Fin");
      this.modifico = false
    }
  }

  modificoFechaFin(){
    this.modifico = true
    this.setFechaFin(this.form.value.integraFinal);
    if(this.fechaFin < this.fechaInicio){
      this.alerta.error("La Fecha de Inicio debe ser mayor que la de Fin");
      this.modifico = false
    }
  }

  setFechaInicio(fecha: Date){
    this.fechaInicio = fecha;
  }

  setFechaFin(fecha: Date){
    this.fechaFin = fecha
  }

  guardarEstudiante(){
    const integra: Integra = {
      idIntegra: this.idIntegra,
      carrera: this.integraEstudiante.carrera,
      formaParticipacion: this.form.value.formaParticipacion,
      integraInicio: this.form.value.integraInicio,
      integraFinal: this.form.value.integraFinal,
      estudiante: this.integraEstudiante.estudiante,
      proyecto: this.integraEstudiante.proyecto
    }

    console.log(integra);
    this.servicioIntegra.updateIntegra(integra, this.idIntegra).subscribe(() => {
      this.form.reset();
      this.alerta.success("Se ha modificado el estudiante");
      this.dialog.close();
    })
  }

  onCancelar(){
    this.form.reset();
    this.dialog.close();
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}
