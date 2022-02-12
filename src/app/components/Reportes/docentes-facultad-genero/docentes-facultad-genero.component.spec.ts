import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentesFacultadGeneroComponent } from './docentes-facultad-genero.component';

describe('DocentesFacultadGeneroComponent', () => {
  let component: DocentesFacultadGeneroComponent;
  let fixture: ComponentFixture<DocentesFacultadGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocentesFacultadGeneroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocentesFacultadGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
