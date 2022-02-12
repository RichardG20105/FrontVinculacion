import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionCarreraComponent } from './seleccion-carrera.component';

describe('SeleccionCarreraComponent', () => {
  let component: SeleccionCarreraComponent;
  let fixture: ComponentFixture<SeleccionCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionCarreraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
