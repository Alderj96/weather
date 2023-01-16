import { City } from "./city.model";

export interface Country {
  name:    string;
  lat:     number;
  lon:     number;
  country: string;
  img:     string;
  cities:  City[];
}
