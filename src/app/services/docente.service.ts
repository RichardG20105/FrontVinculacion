import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  URLBase: string
  constructor(private http: HttpClient) { 
    this.URLBase = environment.apiURL
  }

  getDocentes(): Observable<any>{
    return this.http.get(this.URLBase);
  }
}
