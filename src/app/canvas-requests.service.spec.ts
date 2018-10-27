import { TestBed } from '@angular/core/testing';

import { CanvasRequestsService } from './canvas-requests.service';

describe('CanvasRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanvasRequestsService = TestBed.get(CanvasRequestsService);
    expect(service).toBeTruthy();
  });
});
