import app from './app'
import { startConnection } from './db/database'

async function main() {
  startConnection()
  app.listen(app.get('port'))
  console.log('server on port', app.get('port'))
}

main()
