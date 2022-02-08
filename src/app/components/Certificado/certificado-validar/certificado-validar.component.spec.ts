import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoValidarComponent } from './certificado-validar.component';

describe('CertificadoValidarComponent', () => {
  let component: CertificadoValidarComponent;
  let fixture: ComponentFixture<CertificadoValidarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadoValidarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoValidarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
