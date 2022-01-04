import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Docenteproyecto } from 'src/app/interfaces/docenteproyecto';

@Injectable({
  providedIn: 'root'
})
export class ParticipaService {
  private URLBase: string
  constructor(private http: HttpClient) { 
    this.URLBase = environment.apiURL
  }
  
  getDocentes(id: number): Observable<Docenteproyecto[]>{
    return this.http.get<Docenteproyecto[]>(this.URLBase+'/Participa/ListarProyectoDocente/'+id)
  }
}
