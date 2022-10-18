import { Router } from "express"
import { createUser, getAllUsers } from '../controllers/user.controller';
import { authJwt, verifySignup } from "../middlewares"

const router = Router()

router.route('/')
  .post(verifySignup.validUserFields, createUser)
  .get(authJwt.verifyToken, getAllUsers)

export default router
