import { Router } from "express"
import { signIn, signInByToken } from '../controllers/auth.controller';
import { authJwt } from '../middlewares';

const router = Router()

router.route('/')
  .post(signIn)
  .get(authJwt.verifyToken, signInByToken)

export default router
