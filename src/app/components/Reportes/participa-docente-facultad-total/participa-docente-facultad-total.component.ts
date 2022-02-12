import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Participa } from '../../../interfaces/participa';
import { ParticipaService } from '../../../services/participa.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-participa-docente-facultad-total',
  templateUrl: './participa-docente-facultad-total.component.html',
  styleUrls: ['./participa-docente-facultad-total.component.css']
})
export class ParticipaDocenteFacultadTotalComponent implements OnInit {
  listaDocentes!: Participa[];
  facultad!: string;
  anterior = 35;
   
  constructor(private servicioParticipa: ParticipaService,
    private dialog: MatDialogRef<ParticipaDocenteFacultadTotalComponent>,
    @Inject(MAT_DIALOG_DATA)datos: any) {
      this.facultad = datos.facultad;
    }

  ngOnInit(): void {
    this.getDocentes();
  }
  setAnterior(){
    this.anterior += 10;
    return this.anterior
  }
  getDocentes(){
    let resp = this.servicioParticipa.getDocentesFacultad(this.facultad);
    resp.subscribe(data => {
      this.listaDocentes = data as Participa[];
    }, error => {
      this.dialog.close();
    });
  }
  getPDF(){
    let fecha = new Date();
    let Titulo = "ParticipacionDocentesFacultad_"+`${fecha.getDay()}${fecha.getMonth()}${fecha.getFullYear()}${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}`;
    
    const PDF = new jsPDF("p","mm","a4")
    PDF.addImage("../assets/img/Fondo.png","PNG",0,0,210,297)
    PDF.setFontSize(14)
    PDF.setFont("times","normal","bold")
    PDF.text("Reporte Participación Docentes",75, this.setAnterior());
    PDF.setFontSize(12)
    PDF.setFont("times","normal","normal")
    PDF.text("Número de Docentes de la Facultad de "+this.facultad+": "+this.listaDocentes.length, 14 ,this.setAnterior());
    autoTable(PDF,{startY: this.setAnterior(),html: '#datosDocentes' })
    PDF.save(Titulo+".pdf");
    this.dialog.close()
  }

  getEXCEL(){
    let fecha = new Date();
    let Titulo = "ParticipacionDocentesFacultad_"+`${fecha.getDay()}${fecha.getMonth()}${fecha.getFullYear()}${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}`;
    
    let element = document.getElementById('datosDocentes');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Docentes por Facultad');

    XLSX.writeFile(wb, Titulo+'.xlsx');
  }
}
