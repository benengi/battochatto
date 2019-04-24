import { TestBed } from '@angular/core/testing';

import { DoubleGuardService } from './double-guard.service';

describe('DoubleGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoubleGuardService = TestBed.get(DoubleGuardService);
    expect(service).toBeTruthy();
  });
});
