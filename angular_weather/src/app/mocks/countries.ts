import { Country } from "../models/country.model";

const countries: Country[] = [
  {
    name: 'Mexico',
    lat: 19.4326296,
    lon: -99.1331785,
    country: "MX",
    img: 'mexico_flag.png',
    cities: [
      {
        name: 'Ciudad de Mexico',
        timezone: 'America/Mexico_City',
      },
      {
        name: 'Monterrey',
        timezone: 'America/Monterrey'
      },
      {
        name: 'Tijuana',
        timezone: 'America/Tijuana'
      }
    ]
  },
  {
    name: 'Canada',
    lat: 60.109,
    lon: -113.643,
    country: "CA",
    img: 'canada_flag.png',
    cities: [
      {
        name: "Atlantic",
        timezone: "Canada/Atlantic"
      },
      {
        name: "Central",
        timezone: "Canada/Central"
      },
      {
        name: "Eastern",
        timezone: "Canada/Eastern"
      },
      {
        name: "Mountain",
        timezone: "Canada/Mountain"
      },
      {
        name: "Newfoundland",
        timezone: "Canada/Newfoundland"
      },
      {
        name: "Pacific",
        timezone: "Canada/Pacific"
      },
      {
        name: "Saskatchewan",
        timezone: "Canada/Saskatchewan"
      },
      {
        name: "Yukon",
        timezone: "Canada/Yukon",
      }
    ]
  },
  {
    name: 'Brazil',
    lat: -10.000,
    lon: -55.000,
    country: "BR",
    img: 'brazil_flag.png',
    cities: [
      {
        name: "Acre",
        timezone: "Brazil/Acre"
      },
      {
        name:   "DeNoronha",
        timezone: "Brazil/DeNoronha"
      },
      {
        name:   "East",
        timezone: "Brazil/East"
      },
      {
        name:   "West",
        timezone: "Brazil/West"
      },
    ]
  }
]

export default countries
