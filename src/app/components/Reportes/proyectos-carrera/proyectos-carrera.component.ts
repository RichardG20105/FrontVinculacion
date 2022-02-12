import { Component, Inject, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { ProyectoService } from '../../../services/proyecto.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-proyectos-carrera',
  templateUrl: './proyectos-carrera.component.html',
  styleUrls: ['./proyectos-carrera.component.css']
})
export class ProyectosCarreraComponent implements OnInit {
  anterior = 35;
  carrera: string
  listaProyectos!: Proyecto[]
  constructor(private servicioProyecto: ProyectoService,
    private dialog: MatDialogRef<ProyectosCarreraComponent>,
    @Inject(MAT_DIALOG_DATA)datos: any) { 
      this.carrera = datos.carrera
    }

  ngOnInit(): void {
    this.getProyectos()
  }

  getProyectos(){
    let res = this.servicioProyecto.getProyectosCarrera(this.carrera)
    res.subscribe(data => {
      this.listaProyectos = data as Proyecto[]
    },() => this.dialog.close())
  }

  setAnterior(){
    this.anterior += 10;
    return this.anterior
  }

  getPDF(){
    let fecha = new Date();
    let Titulo = "ProyectosCarrera_"+`${fecha.getDay()}${fecha.getMonth()}${fecha.getFullYear()}${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}`;
    
    const PDF = new jsPDF("p","mm","a4")
    PDF.addImage("../assets/img/Fondo.png","PNG",0,0,210,297)
    PDF.setFontSize(14)
    PDF.setFont("times","normal","bold")
    PDF.text("Reporte de Proyectos", 75, this.setAnterior());
    PDF.setFontSize(12)
    PDF.setFont("times","normal","normal")
    PDF.text("Numero total de proyectos de la Carrera de "+this.carrera+": "+this.listaProyectos.length, 14 ,this.setAnterior());
    autoTable(PDF,{startY: this.setAnterior(),html: '#datosProyectos' })
    PDF.save(Titulo+".pdf");
    this.dialog.close()
  }

  getEXCEL(){
    let fecha = new Date();
    let Titulo = "ProyectosCarrera_"+`${fecha.getDay()}${fecha.getMonth()}${fecha.getFullYear()}${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}`;
    
    let element = document.getElementById('datosProyectos');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Proyectos');

    XLSX.writeFile(wb, Titulo+'.xlsx');
  }

}
