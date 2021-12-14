import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoModificarComponent } from './proyecto-modificar.component';

describe('ProyectoModificarComponent', () => {
  let component: ProyectoModificarComponent;
  let fixture: ComponentFixture<ProyectoModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoModificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
