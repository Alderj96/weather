import { TestBed } from '@angular/core/testing';

import { WeatherCountryService } from './weather-country.service';

describe('WeatherCityService', () => {
  let service: WeatherCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
