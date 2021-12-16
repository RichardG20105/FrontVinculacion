import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Carrera } from 'src/app/interfaces/carrera';
import { Estudiante } from 'src/app/interfaces/estudiante';
import { Facultad } from 'src/app/interfaces/facultad';
import { CarreraService } from 'src/app/services/carrera.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { FacultadService } from 'src/app/services/facultad.service';

@Component({
  selector: 'app-estudiante-crear',
  templateUrl: './estudiante-crear.component.html',
  styleUrls: ['./estudiante-crear.component.css']
})

export class EstudianteCrearComponent implements OnInit {

  sexo: any[] = ["Masculino","Femenino"];
  semestre: any[] = ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto", "Septimo", "Octavo", "Noveno", "Decimo"]
  facultad!: Facultad[];
  carrera!: Carrera[];
  form: FormGroup

  constructor(private fb: FormBuilder,
    private service: EstudianteService,
    private facu: FacultadService,
    private carrer: CarreraService,
    private dialog: MatDialogRef<EstudianteCrearComponent>) {
      this.form = this.fb.group({
        cedula: ["", [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
        nombre: ["", [Validators.required,Validators.pattern("^[a-z A-Z]*$")]],
        semestre: ["", Validators.required],
        sexo: ["", Validators.required],
        facultad: ["", Validators.required],
        carrera: ["", Validators.required]
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

  guardarEstudiante(){
    const estudiante: Estudiante ={
      idCarrera: this.form.value.carrera,
      cedulaEstudiante: this.form.value.cedula,
      nombreEstudiante: this.form.value.nombre,
      semestre: this.form.value.semestre,
      sexoEstudiante: this.form.value.sexo,
      idEstudiante!: 0
    }

    this.service.saveEstudiantes(estudiante).subscribe(data => {
      this.form.reset();
      this.dialog.close();
    },error => console.log(error));
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

}
