import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteCrearComponent } from './estudiante-crear.component';

describe('EstudianteCrearComponent', () => {
  let component: EstudianteCrearComponent;
  let fixture: ComponentFixture<EstudianteCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudianteCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudianteCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
