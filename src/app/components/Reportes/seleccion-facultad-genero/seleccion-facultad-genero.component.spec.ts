import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionFacultadGeneroComponent } from './seleccion-facultad-genero.component';

describe('SeleccionFacultadGeneroComponent', () => {
  let component: SeleccionFacultadGeneroComponent;
  let fixture: ComponentFixture<SeleccionFacultadGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionFacultadGeneroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionFacultadGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
