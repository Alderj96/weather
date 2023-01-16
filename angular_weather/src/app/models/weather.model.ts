export interface WeatherCountry {
  weather: Weather[];
  main: Main;
}

interface Weather {
  description: string;
  icon: string;
}

interface Main {
  temp: string;
}

export interface LocalWeatherCountry{
  description: string;
  temp: string;
  img: string;
}
