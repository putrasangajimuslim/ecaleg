import { TestBed } from '@angular/core/testing';

import { SaksiService } from './saksi.service';

describe('SaksiService', () => {
  let service: SaksiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaksiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
