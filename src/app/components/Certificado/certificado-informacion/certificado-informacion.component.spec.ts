import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoInformacionComponent } from './certificado-informacion.component';

describe('CertificadoInformacionComponent', () => {
  let component: CertificadoInformacionComponent;
  let fixture: ComponentFixture<CertificadoInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadoInformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
