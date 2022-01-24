import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegraModificarComponent } from './integra-modificar.component';

describe('IntegraModificarComponent', () => {
  let component: IntegraModificarComponent;
  let fixture: ComponentFixture<IntegraModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegraModificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegraModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
