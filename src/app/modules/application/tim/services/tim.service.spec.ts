import { TestBed } from '@angular/core/testing';

import { TimService } from './tim.service';

describe('TimService', () => {
  let service: TimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
