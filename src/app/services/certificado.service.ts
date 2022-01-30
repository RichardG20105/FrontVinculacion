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

  saveCertificado(certificado: Certificado): Observable<Object>{
    return this.http.post(this.URLBase+'/Certificado/Registrar',certificado)
  }

  updateCertificado(certificado: Certificado, idCertificado: number){
    return this.http.put(this.URLBase+'/Certificado/Actualizar/'+idCertificado,certificado);
  }
}
