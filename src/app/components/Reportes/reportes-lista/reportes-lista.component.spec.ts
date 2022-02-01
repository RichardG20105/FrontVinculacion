import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesListaComponent } from './reportes-lista.component';

describe('ReportesListaComponent', () => {
  let component: ReportesListaComponent;
  let fixture: ComponentFixture<ReportesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
