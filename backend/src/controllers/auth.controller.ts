import { Request, Response } from "express"
import User from "../models/User"
import * as jwt from 'jsonwebtoken';
import config from "../config";

export const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) return res.status(400).json({ message: 'usuario/contraseña incorrectos, favor de checar' })

    const isSamePassword = await User.comparedPassword(user.password, password)

    if (!isSamePassword)  return res.status(400).json({ message: 'usuario/contraseña incorrectos, favor de checar' })

    await User.updateOne({ username }, { $set: { lastlogin: Date.now() } })

    const token = jwt.sign({ sub: user._id }, config.SECRET, {
      expiresIn: 86400
    })

    res.json({
      user: {
        username: user.username,
        fullname: user.fullname,
        mail: user.mail,
        lastlogin: user.lastlogin,
      },
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Ha ocurrido un error'
    })
  }
}

export const signInByToken = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId)

    if (!user) return res.status(400).json({ message: 'Usuario o contraseña incorrectos, favor de checar' })

    const { authorization: bearerToken } = req.headers
    const token = bearerToken?.split(' ')[1]

    res.json({
      user: {
        username: user.username,
        fullname: user.fullname,
        mail: user.mail,
        lastlogin: user.lastlogin,
      },
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Ha ocurrido un error'
    })
  }
}
