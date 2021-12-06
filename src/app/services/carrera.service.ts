import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrera } from '../interfaces/carrera';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private URLBase: string
  constructor(private http: HttpClient) { 
    this.URLBase = environment.apiURL
  }

  getCarreras(): Observable<Carrera[]>{
    return this.http.get<Carrera[]>(this.URLBase+'/Carrera/ListarCarreras');
  }

  getCarrerasFacultad(id: number): Observable<Carrera[]>{
    return this.http.get<Carrera[]>(this.URLBase+'/Carrera/ListarCarrerasFacultad/'+id)
  }

  getFacultad(id: number): Observable<number>{
    return this.http.get<number>(this.URLBase+'/Carrera/Facultad/'+id);
  }
}
