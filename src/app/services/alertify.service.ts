import { Injectable } from '@angular/core';
import * as alertyfy from 'alertifyjs'

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(mensaje: string){
    alertyfy.success(mensaje);
  }

  warning(mensaje: string){
    alertyfy.warning(mensaje);
  }

  error(mensaje:string){
    alertyfy.error(mensaje);
  }
}
