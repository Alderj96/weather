import { Router } from "express"
import { authJwt } from "../middlewares"
import { createTodo, getAllTodosByUser, finishTodo } from '../controllers/todo.controller';

const router = Router()

router.route('/')
  .all(authJwt.verifyToken)
  .post(createTodo)
  .get(getAllTodosByUser)
  .put(finishTodo)

export default router
