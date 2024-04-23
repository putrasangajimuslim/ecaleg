import { TestBed } from '@angular/core/testing';

import { KelurahanService } from './kelurahan.service';

describe('KelurahanService', () => {
  let service: KelurahanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KelurahanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
