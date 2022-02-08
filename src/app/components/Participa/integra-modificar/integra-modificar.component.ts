import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from '../../../services/alertify.service';
import { IntegraService } from '../../../services/integra.service';
import { Integra } from '../../../interfaces/integra';
import { MatDatepicker } from "@angular/material/datepicker";

@Component({
  selector: 'app-integra-modificar',
  templateUrl: './integra-modificar.component.html',
  styleUrls: ['./integra-modificar.component.css']
})
export class IntegraModificarComponent implements OnInit {
  formaParticipacion: any[] = ["Parte de Asignatura","Prácticas Comunitarias","Prácticas Preprofesionales"]
  idIntegra!: number
  form!: FormGroup
  integraEstudiante!: Integra
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
        anioParticipacion: [],
      })
    }

  ngOnInit(): void {
    this.getIntegraEstudiante();
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
      anioParticipacion: [`${this.integraEstudiante.anioParticipaEst}`,Validators.required],
    })
  }

  guardarEstudiante(){
    const integra: Integra = {
      idIntegra: this.idIntegra,
      carrera: this.integraEstudiante.carrera,
      formaParticipacion: this.form.value.formaParticipacion,
      anioParticipaEst: this.form.value.anioParticipacion,
      estudiante: this.integraEstudiante.estudiante,
      proyecto: this.integraEstudiante.proyecto
    }
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
