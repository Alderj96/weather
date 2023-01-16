import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherCountry, LocalWeatherCountry } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherCountryService {

  private apiUrl = `${environment.API_WEATHER_URL}`
  private iconApiUrl = `${environment.API_IMAGE_WEATHER_URL}`
  private appid = environment.APP_ID

  lang: string = 'es'
  units: string = 'metric'

  constructor(
    private http: HttpClient,
  ) { }

  getWeatherCountry (lat: number, lon: number): Observable<LocalWeatherCountry> {
    return this.http.get<WeatherCountry>(`${this.apiUrl}/data/2.5/weather`, {
      params: {
        lat, lon,
        lang: this.lang,
        units: this.units,
        appid: this.appid
      }
    })
    .pipe(
      map(data => {
        const weather = data.weather[0]
        const main = data.main
        return {
          description: weather.description,
          temp: main.temp,
          img: `${this.iconApiUrl}/img/wn/${weather.icon}@2x.png`
        }
      })
    )
  }

}
