import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CertificadoService } from '../../../services/certificado.service';
import { Certificado } from 'src/app/interfaces/certificado';
import { AlertifyService } from 'src/app/services/alertify.service';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-certificado-modificar',
  templateUrl: './certificado-modificar.component.html',
  styleUrls: ['./certificado-modificar.component.css']
})
export class CertificadoModificarComponent implements OnInit {
  observaciones: any = ["Entregado","No Retira"]
  form: FormGroup
  idCertificado: number;
  certificado!: Certificado;
  tiempo: number = -1;
  modifico = false;
  fechaRec! : Date;
  fechaEnt!: Date
  setFechaRecEstado = false;
  constructor(private fb: FormBuilder,
    private alerta: AlertifyService,
    private servicioCertificado: CertificadoService,
    private adaptadorFecha: DateAdapter<Date>,
    private dialog: MatDialogRef<CertificadoModificarComponent>,
    @Inject(MAT_DIALOG_DATA)datos: any) { 
      this.idCertificado = datos.id;
      this.adaptadorFecha.setLocale('en-GB');
      this.form = this.fb.group({
        nombreProyecto: [],
        resolucion: [],
        nombreSolicitante: [],
        cargo: [],
        facultad: [],
        fechaEntrega: [],
        fechaRecepcion: [],
        observacion: [],
      })
    }

  ngOnInit(): void {
    this.getCertificado();
    this.setFechaEnt(new Date())
  }
  
  getCertificado(){
    let res = this.servicioCertificado.getCertificado(this.idCertificado);
    res.subscribe(data => {
      this.certificado = data as Certificado;
      this.setForm();
    })
  }

  modificoFechaRec(){
    this.modifico = true;
    this.setFechaRec(this.form.value.fechaRecepcion);
    this.setFechaRecEstado = true;
    this.diferenciaDias()
  }

  modificoFechaEnt(){
    this.modifico = true;
    if(!this.getFechaRecEstado()){
      this.alerta.error("Debe definir una Fecha de Recepcion Primero")
      this.modifico = false;
    }else{
      this.setFechaEnt(this.form.value.fechaEntrega);
      this.diferenciaDias()
    }
  }

  setFechaRec(fecha: Date){
    this.fechaRec = fecha;
    this.setFechaRecEstado = true;
    if(this.fechaRec > this.fechaEnt){
      console.log("Hola")
      this.alerta.error("La Fecha de Entrega debe ser mayor a la Fecha de Recepción");
      this.modifico = false;
    }
  }

  setFechaEnt(fecha: Date){
    this.fechaEnt = fecha;
    if(this.fechaRec > this.fechaEnt){
      this.alerta.error("La Fecha de Entrega debe ser mayor a la Fecha de Recepción");
      this.modifico = false;
    }
  }

  getFechaRecEstado(){
    return this.setFechaRecEstado;
  }

  setForm(){
    this.definirTiempo();
    if(this.certificado.participa === null ){
      this.form = this.fb.group({
        nombreProyecto: [{value: `${this.certificado.integra.proyecto.nombreProyecto}`,disabled: true}],
        resolucion: [{value: `${this.certificado.integra.proyecto.resolucion}`,disabled: true}],
        nombreSolicitante: [{value: `${this.certificado.integra.estudiante.nombreEstudiante}`,disabled: true}],
        cargo: [{value: 'Integrante',disabled: true}],
        facultad: [{value: `${this.certificado.integra.carrera}`,disabled: true}],
        fechaEntrega: [this.validaFecha(`${this.certificado.fechaEntrega}`)],
        fechaRecepcion: [this.validaFecha(`${this.certificado.fechaRecepcion}`)],
        observacion: [`${this.certificado.observacionCertificado}`],
      })
    }else{
      this.form = this.fb.group({
        nombreProyecto: [{value: `${this.certificado.participa.proyecto.nombreProyecto}`,disabled: true}],
          resolucion: [{value: `${this.certificado.participa.proyecto.resolucion}`,disabled: true}],
          nombreSolicitante: [{value: `${this.certificado.participa.docente.nombreDocente}`,disabled: true}],
          cargo: [{value: `${this.certificado.participa.cargo}`,disabled: true}],
          facultad: [{value: `${this.certificado.participa.facultad}`,disabled: true}],
          fechaEntrega: [this.validaFecha(`${this.certificado.fechaEntrega}`)],
          fechaRecepcion: [this.validaFecha(`${this.certificado.fechaRecepcion}`)],
          observacion: [`${this.certificado.observacionCertificado}`],
      })
    }
  }

  definirTiempo(){
    if(this.existeFechas()){
      this.setFechaRec(new Date(this.certificado.fechaRecepcion));
      this.setFechaEnt(new Date(this.certificado.fechaEntrega))
      this.diferenciaDias()
    }else{
      if(this.certificado.fechaRecepcion != null){
        this.setFechaRec(new Date(this.certificado.fechaRecepcion));
        this.setFechaEnt(new Date())
        this.diferenciaDias()
      }
    }
  }

  modificoAlgo(){
    this.modifico = true;
  } 
  getModifico(){
    return this.modifico
  }

  validaFecha(fecha: string){
    if(fecha === 'null')
      return '';
    return fecha;
  }

  existeFechas(){
    if(this.certificado.fechaEntrega === null || this.certificado.fechaRecepcion === null){
      return false
    }
    return true;
  }

  diferenciaDias(){
    var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
    var uc1 = Date.UTC(this.fechaRec.getFullYear(),this.fechaRec.getMonth(),this.fechaRec.getDate());
    var uc2 = Date.UTC(this.fechaEnt.getFullYear(),this.fechaEnt.getMonth(),this.fechaEnt.getDate());

    this.tiempo = Math.floor((uc2 - uc1) / MILISENGUNDOS_POR_DIA) 
  }

  getTiempo(){
    if(this.tiempo < 0)
      return null;
    return this.tiempo;
  }

  modificarCertificado(){
    const certificado: Certificado = {
      idCertificado: this.certificado.idCertificado,
      fechaEntrega: this.form.value.fechaEntrega,
      fechaRecepcion: this.form.value.fechaRecepcion,
      observacionCertificado: this.form.value.observacion,
      facultadIntegrante: '',
      codigoCertificado: this.certificado.codigoCertificado,
      integra: this.certificado.integra,
      participa: this.certificado.participa,
    }
    this.servicioCertificado.updateCertificado(certificado,this.idCertificado).subscribe(() => {
      this.form.reset();
      this.alerta.success("Se ha modificado el certificado");
      this.dialog.close();
    })
  }
}
