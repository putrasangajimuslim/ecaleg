import { TestBed } from '@angular/core/testing';

import { AbsenService } from './absen.service';

describe('AbsenService', () => {
  let service: AbsenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
