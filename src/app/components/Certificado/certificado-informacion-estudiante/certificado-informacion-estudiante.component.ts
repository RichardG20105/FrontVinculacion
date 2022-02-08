import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Certificado } from 'src/app/interfaces/certificado';

@Component({
  selector: 'app-certificado-informacion-estudiante',
  templateUrl: './certificado-informacion-estudiante.component.html',
  styleUrls: ['./certificado-informacion-estudiante.component.css']
})
export class CertificadoInformacionEstudianteComponent implements OnInit {
  form: FormGroup
  certificadoInfo: Certificado
  constructor(private fb: FormBuilder,
    private dialog: MatDialogRef<CertificadoInformacionEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA)datos: Certificado) {
      this.certificadoInfo = datos as Certificado
      this.form = this.fb.group({
        codigo: [`${this.certificadoInfo.codigoCertificado}`],
        nombreIntegrante: [`${this.certificadoInfo.integra.estudiante.nombreEstudiante}`],
        facultad: [`${this.certificadoInfo.facultadIntegrante}`],
        formaParticipacion: [`${this.certificadoInfo.integra.formaParticipacion}`],
        fechaEntrega: [ `${this.certificadoInfo.fechaEntrega}`],
        proyecto: [ `${this.certificadoInfo.integra.proyecto.nombreProyecto}`],
        resolucion: [`${this.certificadoInfo.integra.proyecto.resolucion}`],
      })
    }

  ngOnInit(): void {
  }

  Cerrar(){
    this.dialog.close();
  }
}
