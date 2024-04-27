import { TestBed } from '@angular/core/testing';

import { CalonService } from './calon.service';

describe('CalonService', () => {
  let service: CalonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
