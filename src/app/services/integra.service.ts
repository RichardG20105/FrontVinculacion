import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto';
import { Integra } from '../interfaces/integra';

@Injectable({
  providedIn: 'root'
})
export class IntegraService {
  private URLBase: string
  constructor(private http: HttpClient) { 
    this.URLBase = environment.apiURL
  }

  getEstudiantes(proyecto: Proyecto): Observable<Integra[]>{
    return this.http.post<Integra[]>(this.URLBase+'/Integra/ListarIntegracion',proyecto)
  }

  getIntegra(idIntegra: number): Observable<Integra>{
    return this.http.get<Integra>(this.URLBase+'/Integra/'+idIntegra);
  }

  getEstudiantesFacultad(facultad: string):Observable<Integra[]>{
    return this.http.get<Integra[]>(this.URLBase+"/Integra/Listado/"+facultad);
  }

  saveIntegra(integra: Integra): Observable<Object>{
    return this.http.post(this.URLBase+'/Integra/Registrar',integra);
  }

  updateIntegra(integra: Integra, idIntegra: number): Observable<Object>{
    return this.http.put(this.URLBase+'/Integra/Actualizar/'+idIntegra,integra);
  }

  deleteIntegra(idIntegra: number): Observable<Object>{
    return this.http.delete(this.URLBase+'/Integra/Eliminar/'+idIntegra);
  }
}
