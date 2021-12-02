import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../interfaces/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private URLBase!: string
  constructor(private http: HttpClient) {
    this.URLBase = environment.apiURL;
  }

  getProyectos(): Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(this.URLBase+'/Proyecto/ListarProyectos');
  }

  saveProyecto(proyecto: Proyecto): Observable<Object>{
    return this.http.post(this.URLBase+'/Proyecto/Registrar',proyecto);
  }
}
