import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionEstadoComponent } from './seleccion-estado.component';

describe('SeleccionEstadoComponent', () => {
  let component: SeleccionEstadoComponent;
  let fixture: ComponentFixture<SeleccionEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
