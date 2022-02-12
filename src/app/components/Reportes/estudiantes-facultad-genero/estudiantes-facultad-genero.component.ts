import { Component, Inject, OnInit } from '@angular/core';
import { Estudiante } from '../../../interfaces/estudiante';
import { EstudianteService } from '../../../services/estudiante.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-estudiantes-facultad-genero',
  templateUrl: './estudiantes-facultad-genero.component.html',
  styleUrls: ['./estudiantes-facultad-genero.component.css']
})
export class EstudiantesFacultadGeneroComponent implements OnInit {

  listaEstudiantes!: Estudiante[];
  facultad!: string;
  sexo!: string;
  anterior = 35;
  constructor(private servicioEstudiante: EstudianteService,
    private dialog: MatDialogRef<EstudiantesFacultadGeneroComponent>,
    @Inject(MAT_DIALOG_DATA) datos: any) { 
      this.facultad = datos.facultad;
      this.sexo = datos.sexo;
    }

  ngOnInit(): void {
    this.getEstudiantes()
  }

  setAnterior(){
    this.anterior += 10;
    return this.anterior
  }

  getEstudiantes(){
    let resp = this.servicioEstudiante.getEstudiantesFacultadSexo(this.facultad,this.sexo);
    resp.subscribe(data => {
      this.listaEstudiantes = data as Estudiante[]
    },() => this.dialog.close());
  }

  getPDF(){
    let fecha = new Date();
    let Titulo = "EstudiantesFacultadSexo_"+`${fecha.getDay()}${fecha.getMonth()}${fecha.getFullYear()}${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}`;
    
    const PDF = new jsPDF("p","mm","a4")
    PDF.addImage("../assets/img/Fondo.png","PNG",0,0,210,297)
    PDF.setFontSize(14)
    PDF.setFont("times","normal","bold")
    PDF.text("Reporte Estudiantes", 75, this.setAnterior());
    PDF.setFontSize(12)
    PDF.setFont("times","normal","normal")
    PDF.text("Número de Estudiantes de sexo "+this.sexo+" de la Facultad de "+this.facultad+": "+this.listaEstudiantes.length, 14 ,this.setAnterior());
    autoTable(PDF,{startY: this.setAnterior(),html: '#datosEstudiantes' })
    PDF.save(Titulo+".pdf");
    this.dialog.close()
  }

  getEXCEL(){
    let fecha = new Date();
    let Titulo = "EstudiantesFacultadSexo_"+`${fecha.getDay()}${fecha.getMonth()}${fecha.getFullYear()}${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}`;
    
    let element = document.getElementById('datosEstudiantes');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Estudiantes');

    XLSX.writeFile(wb, Titulo+'.xlsx');
  }
}
