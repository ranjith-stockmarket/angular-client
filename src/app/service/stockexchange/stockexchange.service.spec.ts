import { TestBed } from '@angular/core/testing';

import { StockexchangeService } from './stockexchange.service';

describe('StockexchangeService', () => {
  let service: StockexchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockexchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
