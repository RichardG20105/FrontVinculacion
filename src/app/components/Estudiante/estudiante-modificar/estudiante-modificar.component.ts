import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Carrera } from 'src/app/interfaces/carrera';
import { Estudiante } from 'src/app/interfaces/estudiante';
import { Facultad } from 'src/app/interfaces/facultad';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { FacultadService } from 'src/app/services/facultad.service';

@Component({
  selector: 'app-estudiante-modificar',
  templateUrl: './estudiante-modificar.component.html',
  styleUrls: ['./estudiante-modificar.component.css']
})
export class EstudianteModificarComponent implements OnInit {

  sexo: any[] = ["Masculino","Femenino"];
  semestre: any[] = ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto", "Septimo", "Octavo", "Noveno", "Decimo"]
  facultad!: Facultad[];
  carrera!: Carrera[];
  form!: FormGroup;
  idEst!: number;
  idFacu!: number;
  facul!: Facultad;
  estudianteDatos!: Estudiante;

  constructor(private fb: FormBuilder,
    private service: EstudianteService,
    private facu: FacultadService,
    private carrer: CarreraService,
    private alerta: AlertifyService,
    private dialog: MatDialogRef<EstudianteModificarComponent>,
    @Inject(MAT_DIALOG_DATA) datos:any) {
      this.idEst = datos.id
      this.form = this.fb.group({
        cedula: [],
        nombre: [],
        semestre: [],
        sexo: [],
        facultad: [],
        carrera: []
      })
     }

  ngOnInit(): void {
    this.getFacultades();
    this.getEstudiante();
  }

  getFacultades(){
    let resp = this.facu.getFacultades()
    resp.subscribe(data => this.facultad = data as Facultad[])
  }

  getEstudiante(){
    let resp = this.service.getEstudiante(this.idEst)
    resp.subscribe(datos => {this.estudianteDatos = datos as Estudiante,
      this.getCarrera(this.estudianteDatos.idCarrera)});
  }

  getCarrera(id: number){
    let resp = this.carrer.getFacultad(id)
    resp.subscribe(data => {this.idFacu = data.valueOf(), this.getCarrerasFacultad(this.idFacu), this.getFacultad(this.idFacu)})
  }

  getFacultad(id: number){
    let res = this.facu.getFacultad(this.idFacu)
    res.subscribe(data => {this.facul = data as Facultad, this.setForm()})
  }

  setForm(){
    this.form = this.fb.group({
      cedula: [`${this.estudianteDatos.cedulaEstudiante}`,[Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      nombre: [`${this.estudianteDatos.nombreEstudiante}`, [Validators.required,Validators.pattern("^[a-z A-Z]*$")]],
      semestre: [`${this.estudianteDatos.semestre}`, Validators.required],
      sexo: [`${this.estudianteDatos.sexoEstudiante}`, Validators.required],
      facultad: [this.facul.idFacultad, Validators.required],
      carrera: [this.estudianteDatos.idCarrera, Validators.required]
    })
  }

  select(ob: any){
    this.carrera = [];
    this.getCarrerasFacultad(ob.value);
  }

  getCarrerasFacultad(id:number){
    this.carrer.getCarrerasFacultad(id).subscribe(data => {
      this.carrera = data;
  })
  }

  guardarEstudiante(){
    const estudiante: Estudiante = {
      idCarrera: this.form.value.carrera,
      cedulaEstudiante: this.form.value.cedula,
      nombreEstudiante: this.form.value.nombre,
      semestre: this.form.value.semestre,
      sexoEstudiante: this.form.value.sexo,
      idEstudiante: this.idEst 
    }

    this.service.updateEstudiante(estudiante,this.idEst).subscribe(data => {
      this.form.reset();
      this.alerta.success("Se ha modificado el Estudiante")
      this.dialog.close();
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}
