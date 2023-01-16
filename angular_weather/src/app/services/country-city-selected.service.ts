import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Country } from '../models/country.model';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CountryCitySelectedService {

  private country = new BehaviorSubject<Country | null>(null)
  private city = new BehaviorSubject<City | null>(null)

  country$ = this.country.asObservable()
  city$ = this.city.asObservable()

  constructor() { }

  setCountry (country: Country) {
    this.country.next(country)
    this.city.next(null)
  }

  setCity(city: City) {
    this.city.next(city)
  }

  clearData() {
    this.country.next(null)
    this.city.next(null)
  }
}
