import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoCrearComponent } from './certificado-crear.component';

describe('CertificadoCrearComponent', () => {
  let component: CertificadoCrearComponent;
  let fixture: ComponentFixture<CertificadoCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadoCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
