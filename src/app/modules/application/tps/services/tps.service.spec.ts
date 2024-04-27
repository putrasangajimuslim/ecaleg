import { TestBed } from '@angular/core/testing';

import { TpsService } from './tps.service';

describe('TpsService', () => {
  let service: TpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
