import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParticipaService } from '../../../services/participa.service';
import { Participa } from '../../../interfaces/participa';
import { AlertifyService } from 'src/app/services/alertify.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-participa-modificar',
  templateUrl: './participa-modificar.component.html',
  styleUrls: ['./participa-modificar.component.css']
})
export class ParticipaModificarComponent implements OnInit {
  idParticipa!: number
  form!: FormGroup
  participaDocente!: Participa
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
      anioParticipacion: [],
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
      anioParticipacion: [`${this.participaDocente.anioParticipaDoc}`,Validators.required],
      horasParticipacion: [`${this.participaDocente.horasParticipacion}`, [Validators.required, Validators.pattern("^[0-9]*$")]],
    })
  }

  guardarDocente(){
    console.log(this.form.value.anioParticipacion)
    const participa: Participa = {
      idParticipa: this.idParticipa,
      cargo: this.participaDocente.cargo,
      horasParticipacion: this.form.value.horasParticipacion,
      anioParticipaDoc: this.form.value.anioParticipacion,
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
