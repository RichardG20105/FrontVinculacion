import { TestBed } from '@angular/core/testing';

import { IntegraService } from './integra.service';

describe('IntegraService', () => {
  let service: IntegraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntegraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
