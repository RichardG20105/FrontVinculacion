import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipaListarComponent } from './participa-listar.component';

describe('ParticipaListarComponent', () => {
  let component: ParticipaListarComponent;
  let fixture: ComponentFixture<ParticipaListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipaListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
