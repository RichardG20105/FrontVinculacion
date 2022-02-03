import { Component, Inject, OnInit } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacultadService } from '../../../services/facultad.service';
import { Facultad } from 'src/app/interfaces/facultad';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstudiantesFacultadGeneroComponent } from '../estudiantes-facultad-genero/estudiantes-facultad-genero.component';
import { CertificadosFacultadComponent } from '../certificados-facultad/certificados-facultad.component';

@Component({
  selector: 'app-seleccion-facultad-genero',
  templateUrl: './seleccion-facultad-genero.component.html',
  styleUrls: ['./seleccion-facultad-genero.component.css']
})
export class SeleccionFacultadGeneroComponent implements OnInit {

  Sexo: any[] = ["Masculino","Femenino"];
  Facultades!: Facultad[]
  facultad!: string
  tipoSexo!: string
  form!: FormGroup;
  tipo: number = 0;
  constructor(private servicioFacultad: FacultadService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)datos: any) {
      this.tipo = datos.opcion;
      this.form = this.fb.group({
        opcion: ["",[Validators.required]],
        opcionSexo: ["",[Validators.required]]
      })
    }

  ngOnInit(): void {
    this.getFacultades()
  }

  getFacultades(){
    let res = this.servicioFacultad.getFacultades();
    res.subscribe(data => {
      this.Facultades = data as Facultad[];
    })
  }

  escogio(od: any){
    this.facultad = od.value
  }

  escogioSexo(od: any){
    this.tipoSexo = od.value
  }

  PDF(){
    switch (this.tipo) {
      case 1:
        this.docentePDF();
        break;
      case 2:
        this.estudiantePDF();
        break;
      default:
        break;
    }
  }

  estudiantePDF(){
    const dialogo = this.dialog.open(EstudiantesFacultadGeneroComponent, {
      width: "50vw",
      height: "50vh",
      data:{
        facultad: this.facultad,
        sexo: this.tipoSexo
      }
    })
  }
  docentePDF(){
    const dialogo = this.dialog.open(EstudiantesFacultadGeneroComponent, {
      width: "50vw",
      height: "50vh",
      data:{
        facultad: this.facultad,
        sexo: this.tipoSexo
      }
    })
  }
}
