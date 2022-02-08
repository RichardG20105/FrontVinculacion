import { Component, Inject, OnInit } from '@angular/core';
import { IntegraService } from '../../../services/integra.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Integra } from '../../../interfaces/integra';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-participa-estudiante-facultad',
  templateUrl: './participa-estudiante-facultad.component.html',
  styleUrls: ['./participa-estudiante-facultad.component.css']
})
export class ParticipaEstudianteFacultadComponent implements OnInit {

  listaEstudiantes!: Integra[]; 
  facultad!: string;
  anterior = 0;
  constructor(private servicioIntegra: IntegraService,
    private dialog: MatDialogRef<ParticipaEstudianteFacultadComponent>,
    @Inject(MAT_DIALOG_DATA)datos: any) { 
      this.facultad = datos.facultad;
    }

  ngOnInit(): void {
    this.getEstudiantes()
  }

  setAnterior(){
    this.anterior += 10;
    return this.anterior
  }

  getEstudiantes(){
    let resp = this.servicioIntegra.getEstudiantesFacultad(this.facultad);
    resp.subscribe(data => {
      this.listaEstudiantes = data as Integra[]
    },error => {
      this.dialog.close();
    });
  }

  getPDF(){
    let fecha = new Date();
    let Titulo = "ParticipacionEstudiantesFacultad_"+`${fecha.getDay()}${fecha.getMonth()}${fecha.getFullYear()}${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}`;
    
    const PDF = new jsPDF("p","mm","a4")
    PDF.setFontSize(14)
    PDF.setFont("times","normal","bold")
    PDF.text("Reporte Participación Estudiantes", 75, this.setAnterior());
    PDF.setFontSize(12)
    PDF.setFont("times","normal","normal")
    PDF.text("Cantidad de Estudiantes de la Facultad de "+this.facultad+": "+this.listaEstudiantes.length, 14 ,this.setAnterior());
    autoTable(PDF,{startY: this.setAnterior(),html: '#datosEstudiantes' })
    PDF.save(Titulo+".pdf");
    this.dialog.close()
  }
  getEXCEL(){
    let fecha = new Date();
    let Titulo = "ParticipacionEstudiantesFacultad_"+`${fecha.getDay()}${fecha.getMonth()}${fecha.getFullYear()}${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}`;
    
    let element = document.getElementById('datosEstudiantes');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Estudiantes por Facultad');

    XLSX.writeFile(wb, Titulo+'.xlsx');
  }
}
