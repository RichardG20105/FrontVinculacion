import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoListarComponent } from './proyecto-listar.component';

describe('ProyectoListarComponent', () => {
  let component: ProyectoListarComponent;
  let fixture: ComponentFixture<ProyectoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
