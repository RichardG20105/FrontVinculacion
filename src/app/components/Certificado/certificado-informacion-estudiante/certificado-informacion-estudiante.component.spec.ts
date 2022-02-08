import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoInformacionEstudianteComponent } from './certificado-informacion-estudiante.component';

describe('CertificadoInformacionEstudianteComponent', () => {
  let component: CertificadoInformacionEstudianteComponent;
  let fixture: ComponentFixture<CertificadoInformacionEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadoInformacionEstudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoInformacionEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
