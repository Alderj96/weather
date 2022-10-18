import { NextFunction, Request, Response } from "express"
import User from "../models/User"

export const validUserFields = async (req: Request, res: Response, next: NextFunction) => {
  const { fullname, mail, username, password } = req.body
  const datos = [fullname, mail, username, password]
  if (datos.some(value => !value)) {
    return res.status(400).json({ message: 'Faltan datos del usuario' })
  }

  const countMailSaved = await User.count({ mail })
  if (countMailSaved > 0) {
    return res.status(400).json({ message: 'El correo esta en uso' })
  }

  const countUsernameSaved = await User.count({ username })
  if (countUsernameSaved > 0) {
    return res.status(400).json({ message: 'El nombre de usuario esta en uso' })
  }

  next()
}
