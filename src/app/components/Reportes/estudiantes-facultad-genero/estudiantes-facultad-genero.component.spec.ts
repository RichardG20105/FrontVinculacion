import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesFacultadGeneroComponent } from './estudiantes-facultad-genero.component';

describe('EstudiantesFacultadGeneroComponent', () => {
  let component: EstudiantesFacultadGeneroComponent;
  let fixture: ComponentFixture<EstudiantesFacultadGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiantesFacultadGeneroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesFacultadGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
