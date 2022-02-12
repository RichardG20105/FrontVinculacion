import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosCarreraComponent } from './proyectos-carrera.component';

describe('ProyectosCarreraComponent', () => {
  let component: ProyectosCarreraComponent;
  let fixture: ComponentFixture<ProyectosCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosCarreraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
