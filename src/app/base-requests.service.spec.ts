import { TestBed } from '@angular/core/testing';

import { BaseRequestsService } from './base-requests.service';

describe('BaseRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseRequestsService = TestBed.get(BaseRequestsService);
    expect(service).toBeTruthy();
  });
});
