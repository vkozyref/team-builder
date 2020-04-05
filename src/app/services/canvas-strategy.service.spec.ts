import { TestBed } from '@angular/core/testing';

import { CanvasStrategyService } from './canvas-strategy.service';

describe('CanvasStrategyService', () => {
  let service: CanvasStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
