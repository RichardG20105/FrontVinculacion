import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estudiante } from '../interfaces/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private URLBase: string
  constructor(private http: HttpClient) { 
    this.URLBase = environment.apiURL
  }

  getEstudiantes(): Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(this.URLBase+'/Estudiante/ListarEstudiantes')
  }

  getEstudiante(id: number): Observable<Estudiante>{
    return this.http.get<Estudiante>(this.URLBase+"/Estudiante/"+id)
  }

  saveEstudiantes(estudiante: Estudiante): Observable<Object>{
    return this.http.post(this.URLBase+'/Estudiante/Registrar',estudiante);
  }

  updateEstudiante(estudiante:Estudiante,idEst:number): Observable<Object>{
    return this.http.put(this.URLBase+'/Estudiante/Actualizar/'+idEst,estudiante);
  }
}
