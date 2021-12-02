import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Facultad } from 'src/app/interfaces/facultad';
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
  form: FormGroup
  constructor(private fb: FormBuilder,
    private service: DocenteService,
    private facu: FacultadService) {
      this.form = this.fb.group({
        cedula: ["", Validators.required],
        nombre: ["", Validators.required],
        contacto: ["", Validators.required],
        correo: ["", [Validators.email,Validators.required]],
        sexo: ["", Validators.required],
        facultad: ["", Validators.required],
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
  guardarDocente(){

  }
  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}
