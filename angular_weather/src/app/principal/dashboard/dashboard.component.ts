import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { Country } from 'src/app/models/country.model';
import countries from '../../mocks/countries';
import { CountryCitySelectedService } from '../../services/country-city-selected.service';
import { LocalWeatherCountry } from '../../models/weather.model';
import { WeatherCountryService } from '../../services/weather-country.service';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  countries: Country[] = []
  countrySelected: Country | null = null
  citySelected: City | null = null
  weatherCountry: LocalWeatherCountry | null = null
  todosFinisheds$: Observable<Todo[]>;

  constructor(
    private countryCitySelectedService: CountryCitySelectedService,
    private weatherCountryService: WeatherCountryService,
    private todoService: TodoService
  ) {
    this.countryCitySelectedService.country$.subscribe(
      data => {
        this.countrySelected = data
        this.findTemp()
      }
    )
    this.countryCitySelectedService.city$.subscribe(
      data => this.citySelected = data
    )
    this.todoService.getTodosList()
    this.todosFinisheds$ = this.todoService.todosFinisheds$
  }

  ngOnInit(): void {
    this.countries = countries
  }

  onSelectCountry(country: Country) {
    this.countryCitySelectedService.setCountry(country)
  }

  onSelectCity(city: City) {
    this.countryCitySelectedService.setCity(city)
  }

  findTemp() {
    if (!this.countrySelected) return
    const { lat, lon } = this.countrySelected
    this.weatherCountryService.getWeatherCountry(lat, lon)
    .subscribe(data => {
      this.weatherCountry = data
    })
  }

}
