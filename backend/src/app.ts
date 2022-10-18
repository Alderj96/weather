import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

const app = express()

import indexRoutes from './routes/index'

// settings
app.set('port', process.env.PORT || 3000)

// middleware
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

// routes
app.use('/api', indexRoutes)

export default app
