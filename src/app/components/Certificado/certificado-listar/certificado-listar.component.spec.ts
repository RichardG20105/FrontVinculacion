import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoListarComponent } from './certificado-listar.component';

describe('CertificadoListarComponent', () => {
  let component: CertificadoListarComponent;
  let fixture: ComponentFixture<CertificadoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadoListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
