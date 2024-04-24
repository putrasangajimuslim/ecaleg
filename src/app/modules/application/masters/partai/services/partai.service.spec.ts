import { TestBed } from '@angular/core/testing';

import { PartaiService } from './partai.service';

describe('PartaiService', () => {
  let service: PartaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
