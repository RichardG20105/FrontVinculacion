import { Component, Inject, OnInit } from '@angular/core';
import { CertificadoService } from '../../../services/certificado.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Certificado } from '../../../interfaces/certificado';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-certificados-facultad',
  templateUrl: './certificados-facultad.component.html',
  styleUrls: ['./certificados-facultad.component.css']
})
export class CertificadosFacultadComponent implements OnInit {
  facultad!: string
  listaCertificadosDocente!: Certificado[]
  listaCertificadosEstudiantes!: Certificado[]
  anterior = 0;
  finalY = 0;
  Docente = false;
  Estudiante = false;
  noEncontroDocente = false;
  noEncontroEstudiante = false;

  constructor(private servicioCertificado: CertificadoService,
    private dialog: MatDialogRef<CertificadosFacultadComponent>,
    @Inject(MAT_DIALOG_DATA)datos: any) {
      this.facultad = datos.facultad;
     }

  ngOnInit(): void {
    this.getCertificados()
  }
  setAnterior(){
    this.anterior += this.finalY + 10;
    return this.anterior
  }

  getCertificados(){
    let resp = this.servicioCertificado.getCertificadosDocenteFacultad(this.facultad)
    resp.subscribe(data => {
      this.listaCertificadosDocente = data as Certificado[]
      this.Docente = true
    }, error => this.noEncontroDocente = true)
    
    let res = this.servicioCertificado.getCertificadosEstudianteFacultad(this.facultad)
    res.subscribe(data => {
      this.listaCertificadosEstudiantes = data as Certificado[]
      this.Estudiante = true;
    },error => this.noEncontroEstudiante = true)

    if(this.noEncontroDocente && this.noEncontroEstudiante){
      this.dialog.close();
    }
  }

  getCantidad(){
    let C1 = 0; 
    let C2 = 0;
    if(this.Docente){
      C1 = this.listaCertificadosDocente.length
    }

    if(this.Estudiante){
      C2 = this.listaCertificadosEstudiantes.length
    }

    return (C1+C2)
  }

  getPDF(){
    let fecha = new Date();
    let Titulo = "CertificadosFacultad_"+`${fecha.getDay()}${fecha.getMonth()}${fecha.getFullYear()}${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}`;
    
    const PDF = new jsPDF("p","mm","a4")
    PDF.setFontSize(14)
    PDF.setFont("times","normal","bold")
    PDF.text("Reporte Cantidad de Certificados",75, this.setAnterior());
    PDF.setFontSize(12)
    PDF.setFont("times","normal","normal")
    PDF.text("Cantidad de Certificados emitidos de la Facultad de "+this.facultad+": "+this.getCantidad(), 14 ,this.setAnterior());
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
