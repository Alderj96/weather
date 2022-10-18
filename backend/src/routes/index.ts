import { Router } from "express"

import UserRoutes from './user.routes'
import AuthRoutes from './auth.routes'
import TodoRoutes from './todo.routes'

const router = Router()

router
  .use('/user', UserRoutes)
  .use('/auth', AuthRoutes)
  .use('/todo', TodoRoutes)

export default router
