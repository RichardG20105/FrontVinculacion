import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosEstadoComponent } from './proyectos-estado.component';

describe('ProyectosEstadoComponent', () => {
  let component: ProyectosEstadoComponent;
  let fixture: ComponentFixture<ProyectosEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
