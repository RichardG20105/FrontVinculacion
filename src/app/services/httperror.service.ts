import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators' 
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class HttperrorService implements HttpInterceptor{

  constructor(private alertyfy:AlertifyService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
      return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          const errorMensaje = this.setError(error);
          this.alertyfy.error(errorMensaje);
          return throwError(errorMensaje);
        })
      );
  }

  setError(error: HttpErrorResponse): string{
    let errorMensaje = 'No hay conexión con los servicios WEB';
    if(error.error instanceof ErrorEvent){
      //Error del lado del Cliente
      errorMensaje = error.error.message;
    }else{
      //Error del lado del Servidor
      if(error.status !== 0){
        errorMensaje = error.error.message;
      }
    }
    return errorMensaje;
  };
}
