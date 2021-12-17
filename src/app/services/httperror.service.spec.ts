import { TestBed } from '@angular/core/testing';

import { HttperrorService } from './httperror.service';

describe('HttperrorService', () => {
  let service: HttperrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttperrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
