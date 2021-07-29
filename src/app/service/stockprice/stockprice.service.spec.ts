import { TestBed } from '@angular/core/testing';

import { StockpriceService } from './stockprice.service';

describe('StockpriceService', () => {
  let service: StockpriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockpriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
