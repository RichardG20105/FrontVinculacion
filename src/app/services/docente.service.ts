import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Docente } from '../interfaces/docente';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private URLBase: string
  constructor(private http: HttpClient) { 
    this.URLBase = environment.apiURL
  }

  getDocentes(): Observable<Docente[]>{
    return this.http.get<Docente[]>(this.URLBase+'/Docente/ListarDocentes');
  }
  getDocente(id: number): Observable<Docente>{
    return this.http.get<Docente>(this.URLBase+"/Docente/"+id)
  }

  getDocenteCedula(cedula: string): Observable<Docente>{
    return this.http.get<Docente>(this.URLBase+"/Docente/Cedula/"+cedula)
  }

  getDocentesFacultadSexo(facultad: string,sexo: string): Observable<Docente[]>{
    return this.http.get<Docente[]>(this.URLBase+"/Docente/Listado/"+facultad+"/"+sexo);
  }

  saveDocente(docente: Docente): Observable<Object>{
    return this.http.post(this.URLBase+'/Docente/Registrar',docente);
  }
  updateDocente(docente:Docente,idDoc:number): Observable<Object>{
    return this.http.put(this.URLBase+'/Docente/Actualizar/'+idDoc,docente);
  }
}