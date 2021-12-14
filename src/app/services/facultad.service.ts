import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Facultad } from '../interfaces/facultad';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {
  private URLBase: string
  constructor(private http: HttpClient) { 
    this.URLBase = environment.apiURL
  }

  getFacultades(): Observable<Facultad[]>{
    return this.http.get<Facultad[]>(this.URLBase+"/Facultad/ListarFacultades");
  }

  getFacultad(id: number):Observable<Facultad>{
    return this.http.get<Facultad>(this.URLBase+"/Facultad/"+id);
  }
}
