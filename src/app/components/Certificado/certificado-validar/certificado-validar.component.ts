import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CertificadoService } from '../../../services/certificado.service';
import { CertificadoInformacionComponent } from '../certificado-informacion/certificado-informacion.component';
import { CertificadoInformacionEstudianteComponent } from '../certificado-informacion-estudiante/certificado-informacion-estudiante.component';

@Component({
  selector: 'app-certificado-validar',
  templateUrl: './certificado-validar.component.html',
  styleUrls: ['./certificado-validar.component.css']
})
export class CertificadoValidarComponent implements OnInit {
  form: FormGroup
  constructor( private servicioCertificado: CertificadoService,
    private dialog: MatDialog,
    private fb: FormBuilder) { 
    this.form = this.fb.group({
      codigo: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  BuscarCodigo(){
    let res = this.servicioCertificado.getCertificadoCodigo(this.form.value.codigo);
    res.subscribe(data => {
      if(data){
        if(data.integra == null){
          const dial = this.dialog.open(CertificadoInformacionComponent,{
            width: '50vw',
            height: '70vh',
            data: data,
            autoFocus: false,
          })
          dial.afterClosed().subscribe(() => this.form.reset);
        }

        if(data.participa == null){
          const dial = this.dialog.open(CertificadoInformacionEstudianteComponent,{
            width: '50vw',
            height: '70vh',
            data: data,
            autoFocus: false,
          })
          dial.afterClosed().subscribe(() => this.form.reset);
        }
      }
    })
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}
