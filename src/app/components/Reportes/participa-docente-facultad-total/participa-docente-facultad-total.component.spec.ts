import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipaDocenteFacultadTotalComponent } from './participa-docente-facultad-total.component';

describe('ParticipaDocenteFacultadTotalComponent', () => {
  let component: ParticipaDocenteFacultadTotalComponent;
  let fixture: ComponentFixture<ParticipaDocenteFacultadTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipaDocenteFacultadTotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipaDocenteFacultadTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
