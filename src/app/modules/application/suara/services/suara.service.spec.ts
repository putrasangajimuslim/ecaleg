import { TestBed } from '@angular/core/testing';

import { SuaraService } from './suara.service';

describe('SuaraService', () => {
  let service: SuaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuaraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
