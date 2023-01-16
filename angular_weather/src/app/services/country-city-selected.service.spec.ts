import { TestBed } from '@angular/core/testing';

import { CountryCitySelectedService } from './country-city-selected.service';

describe('TimeService', () => {
  let service: CountryCitySelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryCitySelectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
