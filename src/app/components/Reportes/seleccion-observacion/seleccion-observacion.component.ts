import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CertificadoObservacionComponent } from '../certificado-observacion/certificado-observacion.component';

@Component({
  selector: 'app-seleccion-observacion',
  templateUrl: './seleccion-observacion.component.html',
  styleUrls: ['./seleccion-observacion.component.css']
})
export class SeleccionObservacionComponent implements OnInit {

  form: FormGroup;
  opcion = 0;
  Observaciones: any = ["Entregado","No Retira"]
  constructor(private fb: FormBuilder,
    private dialog: MatDialog) { 
    this.form = this.fb.group({
      opcion: ["",[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  escogio(ob: any){
    this.opcion = ob.value;
  }

  PDF(){
    const dialogo = this.dialog.open(CertificadoObservacionComponent,{
      width: "50vw",
      height: "50vh",
      data:{
        observacion: this.opcion
      }
    })
  }

}
