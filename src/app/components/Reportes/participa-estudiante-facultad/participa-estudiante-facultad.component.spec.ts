import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipaEstudianteFacultadComponent } from './participa-estudiante-facultad.component';

describe('ParticipaEstudianteFacultadComponent', () => {
  let component: ParticipaEstudianteFacultadComponent;
  let fixture: ComponentFixture<ParticipaEstudianteFacultadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipaEstudianteFacultadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipaEstudianteFacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
