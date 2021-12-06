import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Carrera } from 'src/app/interfaces/carrera';
import { Docente } from 'src/app/interfaces/docente';
import { Facultad } from 'src/app/interfaces/facultad';
import { CarreraService } from 'src/app/services/carrera.service';
import { DocenteService } from 'src/app/services/docente.service';
import { FacultadService } from 'src/app/services/facultad.service';

@Component({
  selector: 'app-docente-modificar',
  templateUrl: './docente-modificar.component.html',
  styleUrls: ['./docente-modificar.component.css']
})
export class DocenteModificarComponent implements OnInit {

  sexo: any[] = ["Masculino","Femenino"];
  relacionLaboral: any[] = ["Titular","Ocasional"];
  facultad!: Facultad[];
  carrera!: Carrera[];
  form!: FormGroup;
  idDoc!: number;
  idFacu!: number;
  nombreFacultad!: string
  docenteDatos!: Docente;

  constructor(private fb: FormBuilder,
    private service: DocenteService,
    private facu: FacultadService,
    private carrer: CarreraService,
    private dialog: MatDialogRef<DocenteModificarComponent>,
    @Inject(MAT_DIALOG_DATA) datos:any) {
      this.idDoc = datos.id
      this.form = this.fb.group({
        cedula: [],
        nombre: [],
        contacto: [],
        correo: [],
        sexo: [],
        facultad: [],
        carrera: [],
        relacion: []
      })
     }

  ngOnInit(): void {
    this.getFacultades();
    this.getDocente();
  }

  getFacultades(){
    let resp = this.facu.getFacultades()
    resp.subscribe(data => this.facultad = data as Facultad[])
  }

  getDocente(){
    let resp = this.service.getDocente(this.idDoc)
    resp.subscribe(datos => {this.docenteDatos = datos as Docente
    this.setForm()});
  }
  getFacultad(id: number){
    this.carrer.getFacultad(id).subscribe(data => this.idFacu = data)
    this.facu.getFacultad(this.idFacu).subscribe(data => this.nombreFacultad = data)
  }

  setForm(){
    console.log("FORM")
    console.log(this.docenteDatos)
    this.form = this.fb.group({
      cedula: [`${this.docenteDatos.cedulaDocente}`,[Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      nombre: [`${this.docenteDatos.nombreDocente}`, [Validators.required,Validators.pattern("^[a-z A-Z]*$")]],
      contacto: [`${this.docenteDatos.contacto}`, [Validators.required,Validators.minLength(9), Validators.pattern("^[0-9]*$")]],
      correo: [`${this.docenteDatos.correoElectronico}`, [Validators.email, Validators.required]],
      sexo: [`${this.docenteDatos.sexoDocente}`, Validators.required],
      facultad: [`${this.idFacu}`, Validators.required],
      carrera: [`${this.docenteDatos.idCarrera}`, Validators.required],
      relacion: [`${this.docenteDatos.relacionLaboral}`, Validators.required]
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
  guardarDocente(){
    const docente: Docente = {
      idCarrera: this.form.value.carrera,
      cedulaDocente: this.form.value.cedula,
      nombreDocente: this.form.value.nombre,
      contacto: this.form.value.contacto,
      correoElectronico: this.form.value.correo,
      relacionLaboral: this.form.value.relacion,
      sexoDocente: this.form.value.sexo,
      idDocente: this.idDoc 
    }

    this.service.updateDocente(docente,this.idDoc).subscribe(data => {
      this.form.reset();
      this.dialog.close();
    },error => console.log(error));
  }
  
  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}