import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteModificarComponent } from './docente-modificar.component';

describe('DocenteModificarComponent', () => {
  let component: DocenteModificarComponent;
  let fixture: ComponentFixture<DocenteModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocenteModificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
