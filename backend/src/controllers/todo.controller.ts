import { Request, Response } from "express"
import Todo from "../models/Todo"

export const getAllTodosByUser = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({ user: req.userId })
    res.json(todos)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Ha ocurrido un error'
    })
  }
}

export const createTodo = async (req: Request, res: Response) => {
  try {
    const newTodo = new Todo({ description: req.body.description, user: req.userId })
    const todoSaved = await newTodo.save()

    res.json({ todo: todoSaved })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Ha ocurrido un error'
    })
  }
}

export const finishTodo = async (req: Request, res: Response) => {
  try {
    const todoUpdated = await Todo.findByIdAndUpdate(
      req.body._id,
      { $set: {
        finished: true,
        datefinished: Date.now()
      }},
      { new: true }
    )

    res.json({ todo: todoUpdated })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Ha ocurrido un error'
    })
  }
}
