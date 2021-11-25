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
}