import { Component, Inject, OnInit } from '@angular/core';
import { CertificadoService } from '../../../services/certificado.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Certificado } from '../../../interfaces/certificado';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-certificado-observacion',
  templateUrl: './certificado-observacion.component.html',
  styleUrls: ['./certificado-observacion.component.css']
})
export class CertificadoObservacionComponent implements OnInit {
  listadoDocenteCertificados!: Certificado[]
  listadoEstudianteCertificados!: Certificado[]
  observacion!: string
  noEncontroDocente = false;
  noEncontroEstudiante = false;
  Docente = false;
  Estudiante = false;
  anterior = 0;
  finalY = 0;
  constructor(private servicioCertificado: CertificadoService,
    private dialog: MatDialogRef<CertificadoObservacionComponent>,
    @Inject(MAT_DIALOG_DATA)datos: any) {
      this.observacion = datos.observacion
     }

  ngOnInit(): void {
    this.getCertificados();
  }

  getCertificados(){
    let resp = this.servicioCertificado.getCertificadosDocenteObservacion(this.observacion);
    resp.subscribe(data => {
      this.listadoDocenteCertificados = data as Certificado[]
      this.Docente = true;
    }, error => this.noEncontroDocente = true)

    let res = this.servicioCertificado.getCertificadosEstudianteObservacion(this.observacion);
    res.subscribe(data => {
      this.listadoEstudianteCertificados = data as Certificado[]
      this.Estudiante = true;
    }, error => this.noEncontroEstudiante = true)

    if(this.noEncontroDocente && this.noEncontroEstudiante){
      this.dialog.close()
    }
  }
  setAnterior(){
    this.anterior += this.finalY + 10;
    return this.anterior
  }

  getCantidad(){
    let C1 = 0; 
    let C2 = 0;
    if(this.Docente){
      C1 = this.listadoDocenteCertificados.length
    }

    if(this.Estudiante){
      C2 = this.listadoEstudianteCertificados.length
    }

    return (C1+C2)
  }

  getPDF(){
    let fecha = new Date();
    let Titulo = "CertificadosObservacion_"+`${fecha.getDay()}${fecha.getMonth()}${fecha.getFullYear()}${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}`;
    
    const PDF = new jsPDF("p","mm","a4")
    PDF.setFontSize(14)
    PDF.setFont("times","normal","bold")
    PDF.text("Reporte Cantidad de Certificados",75, this.setAnterior());
    PDF.setFontSize(12)
    PDF.setFont("times","normal","normal")
    PDF.text("Cantidad de Certificados con la Observacion "+this.observacion+": "+this.getCantidad(), 14 ,this.setAnterior());
    PDF.setFontSize(14)
    PDF.setFont("times","normal","bold")
    if(this.Docente){
      PDF.text("Certificados de Docentes",75, this.setAnterior());
      autoTable(PDF,{startY: this.setAnterior(),html: '#datosDocentes' })
      this.finalY = (PDF as any).lastAutoTable.finalY;
      this.finalY -= 40;
    }
    if(this.Estudiante){
      PDF.text("Certificados de Estudiantes",75, this.setAnterior());
      this.finalY = 0;
      autoTable(PDF,{startY: this.setAnterior(),html: "#datosEstudiantes"})
    }
    PDF.save(Titulo+".pdf");
    this.dialog.close()
  }
}
