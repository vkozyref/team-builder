import { TestBed } from '@angular/core/testing';

import { CardStrategyService } from './card-strategy.service';

describe('CardStrategyService', () => {
  let service: CardStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
