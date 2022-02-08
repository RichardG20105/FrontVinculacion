import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Certificado } from '../interfaces/certificado';
import { Observable } from 'rxjs';
import { Integra } from '../interfaces/integra';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {
  private URLBase: string
  constructor(private http: HttpClient) {
    this.URLBase = environment.apiURL;
  }

  getCertificadosEstudiantes(): Observable<Certificado[]>{
    return this.http.get<Certificado[]>(this.URLBase+'/Certificado/ListarCertificadosIntegra');
  }

  getCertificadosDocentes(): Observable<Certificado[]>{
    return this.http.get<Certificado[]>(this.URLBase+'/Certificado/ListarCertificadosParticipa');
  }

  getCertificado(idCertificado: number): Observable<Certificado>{
    return this.http.get<Certificado>(this.URLBase + '/Certificado/'+idCertificado);
  }

  getCertificadosDocenteFacultad(facultad:string):Observable<Certificado[]>{
    return this.http.get<Certificado[]>(this.URLBase+'/Certificado/ListadoDocente/'+facultad);
  }

  getCertificadosEstudianteFacultad(facultad:string):Observable<Certificado[]>{
    return this.http.get<Certificado[]>(this.URLBase+'/Certificado/ListadoEstudiante/'+facultad);
  }

  getCertificadosDocenteObservacion(observacion: string): Observable<Certificado[]>{
    return this.http.get<Certificado[]>(this.URLBase+'/Certificado/ListadoCertificadoDocente/'+observacion);
  }

  getCertificadosEstudianteObservacion(observacion: string): Observable<Certificado[]>{
    return this.http.get<Certificado[]>(this.URLBase+'/Certificado/ListadoCertificadoEstudiante/'+observacion);
  }

  getCertificadoCodigo(codigo: string): Observable<Certificado>{
    return this.http.get<Certificado>(this.URLBase+'/Certificado/ValidarCertificado/'+codigo);
  }

  saveCertificado(certificado: Certificado): Observable<Certificado>{
    return this.http.post<Certificado>(this.URLBase+'/Certificado/Registrar',certificado)
  }

  updateCertificado(certificado: Certificado, idCertificado: number){
    return this.http.put(this.URLBase+'/Certificado/Actualizar/'+idCertificado,certificado);
  }
}
