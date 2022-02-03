import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionObservacionComponent } from './seleccion-observacion.component';

describe('SeleccionObservacionComponent', () => {
  let component: SeleccionObservacionComponent;
  let fixture: ComponentFixture<SeleccionObservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionObservacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
