import { TestBed } from '@angular/core/testing';

import { KabupatenService } from './kabupaten.service';

describe('KabupatenService', () => {
  let service: KabupatenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KabupatenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
