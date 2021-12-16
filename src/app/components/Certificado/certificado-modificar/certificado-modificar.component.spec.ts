import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoModificarComponent } from './certificado-modificar.component';

describe('CertificadoModificarComponent', () => {
  let component: CertificadoModificarComponent;
  let fixture: ComponentFixture<CertificadoModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadoModificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
