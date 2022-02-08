import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Certificado } from '../../../interfaces/certificado';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-certificado-informacion',
  templateUrl: './certificado-informacion.component.html',
  styleUrls: ['./certificado-informacion.component.css']
})
export class CertificadoInformacionComponent implements OnInit {
  form: FormGroup
  certificadoInfo: Certificado
  constructor(private fb: FormBuilder,
    private dialog: MatDialogRef<CertificadoInformacionComponent>,
    @Inject(MAT_DIALOG_DATA)datos: Certificado) {
    this.certificadoInfo = datos as Certificado
    this.form = this.fb.group({
      codigo: [`${this.certificadoInfo.codigoCertificado}`],
      nombreIntegrante: [`${this.certificadoInfo.participa.docente.nombreDocente}`],
      facultad: [`${this.certificadoInfo.facultadIntegrante}`],
      cargo: [`${this.certificadoInfo.participa.cargo}`],
      horas: [`${this.certificadoInfo.participa.horasParticipacion}`],
      fechaEntrega: [ `${this.certificadoInfo.fechaEntrega}`],
      proyecto: [ `${this.certificadoInfo.participa.proyecto.nombreProyecto}`],
      resolucion: [`${this.certificadoInfo.participa.proyecto.resolucion}`],
    })
  }

  ngOnInit(): void {
  }

  Cerrar(){
    this.dialog.close();
  }
}
