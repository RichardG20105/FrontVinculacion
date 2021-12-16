import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Carrera } from 'src/app/interfaces/carrera';
import { Docente } from 'src/app/interfaces/docente';
import { Facultad } from 'src/app/interfaces/facultad';
import { CarreraService } from 'src/app/services/carrera.service';
import { DocenteService } from 'src/app/services/docente.service';
import { FacultadService } from 'src/app/services/facultad.service';

@Component({
  selector: 'app-docente-crear',
  templateUrl: './docente-crear.component.html',
  styleUrls: ['./docente-crear.component.css']
})
export class DocenteCrearComponent implements OnInit {
  
  sexo: any[] = ["Masculino","Femenino"];
  relacionLaboral: any[] = ["Titular","Ocasional"];
  facultad!: Facultad[];
  carrera!: Carrera[];
  form: FormGroup
  
  constructor(private fb: FormBuilder,
    private service: DocenteService,
    private facu: FacultadService,
    private carrer: CarreraService,
    private dialog: MatDialogRef<DocenteCrearComponent>) {
      this.form = this.fb.group({
        cedula: ["", [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
        nombre: ["", [Validators.required,Validators.pattern("^[a-z A-Z]*$")]],
        contacto: ["", [Validators.required,Validators.minLength(9), Validators.pattern("^[0-9]*$")]],
        correo: ["", [Validators.email, Validators.required]],
        sexo: ["", Validators.required],
        facultad: ["", Validators.required],
        carrera: ["", Validators.required],
        relacion: ["", Validators.required]
      })
     }

  ngOnInit(): void {
    this.getFacultades();
  }

  getFacultades(){
    this.facu.getFacultades().subscribe(data => {
      this.facultad = data;
    })
  }

  select(ob: any){
    this.carrera = [];
    this.getCarrerasFacultad(ob.value);
  }

  getCarrerasFacultad(id:number){
    this.carrer.getCarrerasFacultad(id).subscribe(data => {
      this.carrera = data;
      console.log(data);
    })
  }
  guardarDocente(){
    const docente: Docente = {
      idCarrera: this.form.value.carrera,
      cedulaDocente: this.form.value.cedula,
      nombreDocente: this.form.value.nombre,
      contacto: this.form.value.contacto,
      correoElectronico: this.form.value.correo,
      relacionLaboral: this.form.value.relacion,
      sexoDocente: this.form.value.sexo,
      idDocente!: 0
    }

    this.service.saveDocente(docente).subscribe(data => {
      this.form.reset();
      this.dialog.close();
    },error => console.log(error));
  }
  
  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}
