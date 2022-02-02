import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Participa } from '../../../interfaces/participa';
import { ParticipaService } from '../../../services/participa.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-participa-docente-facultad-total',
  templateUrl: './participa-docente-facultad-total.component.html',
  styleUrls: ['./participa-docente-facultad-total.component.css']
})
export class ParticipaDocenteFacultadTotalComponent implements OnInit {
  listaDocentes!: Participa[];
  facultad!: string;
  Cabecera  = [[
    "Cedula",
    "Nombre",
    "Relacion Laboral"
  ]]
  @ViewChild('datosDocentes')
  datosDocentes!: ElementRef;
   
  constructor(private servicioParticipa: ParticipaService,
    private dialog: MatDialogRef<ParticipaDocenteFacultadTotalComponent>,
    @Inject(MAT_DIALOG_DATA)datos: any) {
      this.facultad = datos.facultad;
    }

  ngOnInit(): void {
    this.getDocentes();
  }

  getDocentes(){
    let resp = this.servicioParticipa.getDocentesFacultad(this.facultad);
    resp.subscribe(data => {
      this.listaDocentes = data as Participa[];
    })
  }
  getPDF(){
    let fecha = new Date();
    let Titulo = "ParticipacionDocentesFacultad_"+`${fecha.getDay()}${fecha.getMonth()}${fecha.getFullYear()}${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}`;
    const PDF = new jsPDF()
    PDF.text("Reporte Participación Docente", 50, 10);
    autoTable(PDF,{html: '#datosDocentes' })
    PDF.html('datosDocentes');
    PDF.save(Titulo+".pdf");
    this.dialog.close()
  }
}
