import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParticipaService } from '../../../services/participa.service';
import { Participa } from '../../../interfaces/participa';
import { AlertifyService } from 'src/app/services/alertify.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


@Component({
  selector: 'app-participa-modificar',
  templateUrl: './participa-modificar.component.html',
  styleUrls: ['./participa-modificar.component.css']
})
export class ParticipaModificarComponent implements OnInit {
  idParticipa!: number
  form!: FormGroup
  participaDocente!: Participa
  modifico = false
  fechaMaxima = new Date()
  fechaInicio!:Date
  fechaFin!:Date
  constructor(private fb: FormBuilder,
    private alerta: AlertifyService,
    private servicio: ParticipaService,
    private adaptadorFecha: DateAdapter<Date>,
    private dialog: MatDialogRef<ParticipaModificarComponent>,
    @Inject(MAT_DIALOG_DATA)datos:any) {
    this.idParticipa = datos.id;
    this.adaptadorFecha.setLocale('en-GB');
    this.form = this.fb.group({
      cedula: [],
      nombre: [],
      participacionInicio: [],
      participacionFinal: [],
      horasParticipacion: [],
    })
   }

  ngOnInit(): void {
    this.getParticipacionDocente()
  }

  getParticipacionDocente(){
    let resp = this.servicio.getParticipa(this.idParticipa);
    resp.subscribe(data => {this.participaDocente = data as Participa,
      this.setForm();
    })
  }

  setForm(){
    this.form = this.fb.group({
      cedula: [`${this.participaDocente.docente.cedulaDocente}`],
      nombre: [`${this.participaDocente.docente.nombreDocente}`],
      participacionInicio: [`${this.participaDocente.participacionInicio}`,Validators.required],
      participacionFinal: [`${this.participaDocente.participacionFinal}`],
      horasParticipacion: [`${this.participaDocente.horasParticipacion}`, [Validators.required,Validators.pattern("^[0-9]*$")]],
    })
    this.setFechaInicio(new Date(this.participaDocente.participacionInicio))
    this.setFechaFin(new Date(this.participaDocente.participacionFinal))
  }

  modificoHoras(event: any): void{
    if(event.target.value != '')
      this.modifico = true;
    else
      this.modifico = false;
  }

  modificoFechaInicio(){
    this.modifico = true;
    this.setFechaInicio(this.form.value.participacionInicio)
    if(this.fechaFin < this.fechaInicio){
      this.alerta.error("La Fecha de Inicio debe ser mayor que la de Fin");
      this.modifico = false
    }
  }

  modificoFechaFin(){
    this.modifico = true
    this.setFechaFin(this.form.value.participacionFinal);
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

  modificoAlgo(){
    this.modifico = true
  }

  getModifico(){
    return this.modifico
  }

  guardarDocente(){
    const participa: Participa = {
      idParticipa: this.idParticipa,
      cargo: this.participaDocente.cargo,
      horasParticipacion: this.form.value.horasParticipacion,
      participacionInicio: this.form.value.participacionInicio,
      participacionFinal: this.form.value.participacionFinal,
      facultad: this.participaDocente.facultad,
      docente: this.participaDocente.docente,
      proyecto: this.participaDocente.proyecto
    }

    this.servicio.upadateParticipa(participa,this.idParticipa).subscribe(() => {
      this.form.reset();
      this.alerta.success("Se ha modificado la participacion del docente");
      this.dialog.close();
    })
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}
