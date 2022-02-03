import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadosFacultadComponent } from './certificados-facultad.component';

describe('CertificadosFacultadComponent', () => {
  let component: CertificadosFacultadComponent;
  let fixture: ComponentFixture<CertificadosFacultadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadosFacultadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadosFacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
