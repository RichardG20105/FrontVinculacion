import { Component, Inject, OnInit } from '@angular/core';
import { Docente } from 'src/app/interfaces/docente';
import { DocenteService } from '../../../services/docente.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-docentes-facultad-genero',
  templateUrl: './docentes-facultad-genero.component.html',
  styleUrls: ['./docentes-facultad-genero.component.css']
})
export class DocentesFacultadGeneroComponent implements OnInit {
  listaDocentes!: Docente[]
  facultad!: string;
  sexo!: string;
  anterior = 35;
  constructor(private servicioDocente: DocenteService,
    private dialog: MatDialogRef<DocentesFacultadGeneroComponent>,
    @Inject(MAT_DIALOG_DATA)datos: any) {
      this.facultad = datos.facultad;
      this.sexo = datos.sexo
     }

  ngOnInit(): void {
    this.getDocentes()
  }

  setAnterior(){
    this.anterior += 10;
    return this.anterior
  }

  getDocentes(){
    let resp = this.servicioDocente.getDocentesFacultadSexo(this.facultad,this.sexo)
    resp.subscribe(data => {
      this.listaDocentes = data as Docente[]
    }, () => this.dialog.close());
  }

  getPDF(){
    let fecha = new Date();
    let Titulo = "DocentesFacultadSexo_"+`${fecha.getDay()}${fecha.getMonth()}${fecha.getFullYear()}${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}`;
    
    const PDF = new jsPDF("p","mm","a4")
    PDF.addImage("../assets/img/Fondo.png","PNG",0,0,210,297)
    PDF.setFontSize(14)
    PDF.setFont("times","normal","bold")
    PDF.text("Reporte Docentes", 75, this.setAnterior());
    PDF.setFontSize(12)
    PDF.setFont("times","normal","normal")
    PDF.text("Número de Docentes del sexo "+this.sexo+" de la Facultad de "+this.facultad+": "+this.listaDocentes.length, 14 ,this.setAnterior());
    autoTable(PDF,{startY: this.setAnterior(),html: '#datosDocentes' })
    PDF.save(Titulo+".pdf");
    this.dialog.close()
  }

  getEXCEL(){
    let fecha = new Date();
    let Titulo = "DocentesFacultadSexo_"+`${fecha.getDay()}${fecha.getMonth()}${fecha.getFullYear()}${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}`;
    
    let element = document.getElementById('datosDocentes');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Docentes');

    XLSX.writeFile(wb, Titulo+'.xlsx');
  }
}
