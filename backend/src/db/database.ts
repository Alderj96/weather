import mongoose, { connect } from 'mongoose'
const db = 'mongodb+srv://weather-user:Ytkl4aYhCv63a45r@cluster0.xi6jo.mongodb.net/weather-db?retryWrites=true&w=majority'
// const db = 'mongodb://localhost/weather'
export async function startConnection() {
  await connect(db)

  console.log('Databse is connected')
}
