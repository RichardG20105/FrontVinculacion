import { Component, Inject, OnInit } from '@angular/core';
import { Facultad } from 'src/app/interfaces/facultad';
import { FacultadService } from '../../../services/facultad.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ParticipaDocenteFacultadTotalComponent } from '../participa-docente-facultad-total/participa-docente-facultad-total.component';
import { ParticipaEstudianteFacultadComponent } from '../participa-estudiante-facultad/participa-estudiante-facultad.component';
import { CertificadosFacultadComponent } from '../certificados-facultad/certificados-facultad.component';
import { ProyectosFacultadComponent } from '../proyectos-facultad/proyectos-facultad.component';

@Component({
  selector: 'app-seleccion-facultad',
  templateUrl: './seleccion-facultad.component.html',
  styleUrls: ['./seleccion-facultad.component.css']
})
export class SeleccionFacultadComponent implements OnInit {
  Facultades!: Facultad[]
  form: FormGroup;
  facultad!: string;
  tipo: number = 0;
  constructor(private servicioFacultad: FacultadService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)datos:any) { 
      this.tipo = datos.opcion;
      this.form = this.fb.group({
        opcion: ["",[Validators.required]]
      })
    }

  ngOnInit(): void {
    this.getFacultades();
  }

  getFacultades(){
    let res = this.servicioFacultad.getFacultades();
    res.subscribe(data => {
      this.Facultades = data as Facultad[];
    })
  }
  
  escogio(ob: any){
    this.facultad = ob.value;
  }

  PDF(){
    switch(this.tipo){
      case 1:
        this.docentePDF();
        break;
      case 2:
        this.estudiantePDF();
        break;
      case 3:
        this.certificadosPDF();
        break;
      case 4:
        this.proyectosFacultad();
        break;
      default:
        break;
    }
  }

  docentePDF(){
    const dialogo = this.dialog.open(ParticipaDocenteFacultadTotalComponent, {
      width: "50vw",
      height: "50vh",
      data:{
        facultad: this.facultad
      }
    })
  }
  
  estudiantePDF(){
    const dialogo = this.dialog.open(ParticipaEstudianteFacultadComponent, {
      width: "50vw",
      height: "50vh",
      data:{
        facultad: this.facultad
      }
    })
  }

  certificadosPDF(){
    const dialogo = this.dialog.open(CertificadosFacultadComponent, {
      width: "50vw",
      height: "50vh",
      data:{
        facultad: this.facultad
      }
    })
  }

  proyectosFacultad(){
    this.dialog.open(ProyectosFacultadComponent, {
      width: "50vw",
      height: "50vh",
      data: {
        facultad: this.facultad
      }
    })
  }
}
