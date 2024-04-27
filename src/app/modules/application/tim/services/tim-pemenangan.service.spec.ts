import { TestBed } from '@angular/core/testing';

import { TimPemenanganService } from './tim-pemenangan.service';

describe('TimPemenanganService', () => {
  let service: TimPemenanganService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimPemenanganService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
