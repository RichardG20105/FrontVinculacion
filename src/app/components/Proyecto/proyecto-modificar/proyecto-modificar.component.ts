import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ProyectoService } from 'src/app/services/proyecto.service';


@Component({
  selector: 'app-proyecto-modificar',
  templateUrl: './proyecto-modificar.component.html',
  styleUrls: ['./proyecto-modificar.component.css']
})
export class ProyectoModificarComponent implements OnInit {
  form: FormGroup
  idProy: number = 0
  proyecto!: Proyecto
  constructor(private fb: FormBuilder,
    private service: ProyectoService,
    private alerta: AlertifyService,
    private dialog: MatDialogRef<ProyectoModificarComponent>,
    @Inject(MAT_DIALOG_DATA)datos: any) {
      this.idProy = datos.id;
      this.form = this.fb.group({
      codigo: [],
      nombre: [],
      resolucion: []
    })
  }

  ngOnInit(): void {
    this.getProyecto(this.idProy);
  }

  getProyecto(id: number){
    let resp = this.service.getProyecto(id)
    resp.subscribe(data => {this.proyecto = data as Proyecto, this.setForm()})
  }
  
  guardarProyecto(){
    const proyecto: Proyecto = {
      codigo: this.form.value.codigo,
      nombreProyecto: this.form.value.nombre,
      resolucion: this.form.value.resolucion,
      idProyecto!: this.idProy
    }
    this.service.updateProyecto(proyecto,this.idProy).subscribe(data => {
      this.form.reset();
      this.alerta.success("Se ha modificado el Proyecto");
      this.dialog.close();
    });
  }

  setForm(){
    this.form = this.fb.group({
      codigo: [`${this.proyecto.codigo}`, Validators.required],
      nombre: [`${this.proyecto.nombreProyecto}`, Validators.required],
      resolucion: [this.validNull(`${this.proyecto.resolucion}`)]
    })
  }
  validNull(validar: string){
    if(validar == "null")
      return ""
    else
      return validar;
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}

