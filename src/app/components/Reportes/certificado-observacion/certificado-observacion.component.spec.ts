import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoObservacionComponent } from './certificado-observacion.component';

describe('CertificadoObservacionComponent', () => {
  let component: CertificadoObservacionComponent;
  let fixture: ComponentFixture<CertificadoObservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadoObservacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
