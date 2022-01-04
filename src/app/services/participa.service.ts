import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Docenteproyecto } from 'src/app/interfaces/docenteproyecto';
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
}
