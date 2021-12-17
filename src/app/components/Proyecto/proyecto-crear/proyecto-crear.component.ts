import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proyecto-crear',
  templateUrl: './proyecto-crear.component.html',
  styleUrls: ['./proyecto-crear.component.css']
})
export class ProyectoCrearComponent implements OnInit {

  form: FormGroup
  constructor(private fb: FormBuilder,
    private service: ProyectoService,
    private alerta: AlertifyService,
    private dialog: MatDialogRef<ProyectoCrearComponent>) { 
    this.form = this.fb.group({
      codigo: ["", Validators.required],
      nombre: ["", Validators.required],
      resolucion: []
    })
  }

  ngOnInit(): void {
  }
  
  guardarProyecto(){
    const proyecto: Proyecto = {
      codigo: this.form.value.codigo,
      nombreProyecto: this.form.value.nombre,
      resolucion: this.form.value.resolucion,
      idProyecto!:0
    }
    this.service.saveProyecto(proyecto).subscribe(data => {
      this.form.reset();
      this.alerta.success("Se ha creado el Proyecto");
      this.dialog.close();
    });
  }
}
