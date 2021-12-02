import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Facultad } from 'src/app/interfaces/facultad';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { FacultadService } from 'src/app/services/facultad.service';
@Component({
  selector: 'app-estudiante-crear',
  templateUrl: './estudiante-crear.component.html',
  styleUrls: ['./estudiante-crear.component.css']
})
export class EstudianteCrearComponent implements OnInit {

  sexo: any[] = ["Masculino","Femenino"];
  facultad!: Facultad[];
  form: FormGroup

  constructor(private fb: FormBuilder,
    private service: EstudianteService,
    private facu: FacultadService) {
      this.form = this.fb.group({
        cedula: ["", Validators.required],
        nombre: ["", Validators.required],
        semestre: ["", Validators.required],
        sexo: ["", Validators.required],
        facultad: ["", Validators.required],
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

  guardarEstudiante(){}

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

}
