import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosFacultadComponent } from './proyectos-facultad.component';

describe('ProyectosFacultadComponent', () => {
  let component: ProyectosFacultadComponent;
  let fixture: ComponentFixture<ProyectosFacultadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosFacultadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosFacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
