import watherApi from './weatherApi';
const appid = 'c1689d60b27d7b5cb6bd82052a718c6b'
const lang = 'es'
const units = 'metric'

export const getTemp = async (lat: number, lon: number) => {
  const { data } = await watherApi.get('/data/2.5/weather', {
    params: {
      lat,
      lon,
      appid,
      lang,
      units
    }
  })

  const weather = data['weather'][0]

  const urlIcon = `http://openweathermap.org/img/wn/${weather['icon']}@2x.png`

  return {
    description: weather['description'],
    temp: data['main']['temp'],
    urlIcon
  }
}