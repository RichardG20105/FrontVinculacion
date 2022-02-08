import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-certificado-codigo',
  templateUrl: './certificado-codigo.component.html',
  styleUrls: ['./certificado-codigo.component.css']
})
export class CertificadoCodigoComponent implements OnInit {
  codigo: string
  form: FormGroup
  copiado = false;
  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)datos: any) {
      this.codigo = datos.codigo
      this.form = this.fb.group({
        codigo: []
      })
    }

  ngOnInit(): void {
    this.setForm()
  }

  setForm(){
    this.form = this.fb.group({
      codigo: [`${this.codigo}`]
    })
  }

  Copiar(){
    this.copiado = true;
  }

  onCopiado(){
    return this.copiado;
  }
}
