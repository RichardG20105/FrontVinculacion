import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionFacultadComponent } from './seleccion-facultad.component';

describe('SeleccionFacultadComponent', () => {
  let component: SeleccionFacultadComponent;
  let fixture: ComponentFixture<SeleccionFacultadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionFacultadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionFacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
