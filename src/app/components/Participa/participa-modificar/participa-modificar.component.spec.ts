import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipaModificarComponent } from './participa-modificar.component';

describe('ParticipaModificarComponent', () => {
  let component: ParticipaModificarComponent;
  let fixture: ComponentFixture<ParticipaModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipaModificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipaModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
