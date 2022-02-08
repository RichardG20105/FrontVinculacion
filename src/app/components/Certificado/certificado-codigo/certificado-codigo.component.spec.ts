import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoCodigoComponent } from './certificado-codigo.component';

describe('CertificadoCodigoComponent', () => {
  let component: CertificadoCodigoComponent;
  let fixture: ComponentFixture<CertificadoCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadoCodigoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
