import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { Participa } from '../interfaces/participa';

@Injectable({
  providedIn: 'root'
})
export class ParticipaService {
  private URLBase: string
  constructor(private http: HttpClient) { 
    this.URLBase = environment.apiURL
  }
  
  getDocentes(proyecto: Proyecto): Observable<Participa[]>{
    return this.http.post<Participa[]>(this.URLBase+'/Participa/ListarParticipacion',proyecto)
  }

  getCoordinador(proyecto: Proyecto): Observable<Participa>{
    return this.http.post<Participa>(this.URLBase+'/Participa/Coordinador',proyecto);
  }

  getParticipa(idParticipa: number): Observable<Participa>{
    return this.http.get<Participa>(this.URLBase+'/Participa/'+idParticipa);
  }

  getDocentesFacultad(facultad: String): Observable<Participa[]>{
    return this.http.get<Participa[]>(this.URLBase+'/Participa/Listado/'+facultad);
  }

  saveParticipa(participacion:Participa): Observable<Object>{
    return this.http.post(this.URLBase+'/Participa/Registrar',participacion)
  }

  upadateParticipa(participa: Participa,idParticipa: number): Observable<Object>{
    return this.http.put(this.URLBase+'/Participa/Actualizar/'+idParticipa,participa);
  }

  deleteParticipa(idParticipa: number): Observable<Object>{
    return this.http.delete(this.URLBase+'/Participa/Eliminar/'+idParticipa);
  }
}
