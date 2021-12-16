import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteModificarComponent } from './estudiante-modificar.component';

describe('EstudianteModificarComponent', () => {
  let component: EstudianteModificarComponent;
  let fixture: ComponentFixture<EstudianteModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudianteModificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudianteModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
