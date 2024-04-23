import { TestBed } from '@angular/core/testing';

import { KecamatanService } from './kecamatan.service';

describe('KecamatanService', () => {
  let service: KecamatanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KecamatanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
