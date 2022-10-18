import axios from 'axios'

const watherApi = axios.create({
  baseURL: 'https://api.openweathermap.org'
})

export default watherApi