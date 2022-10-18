import { NextFunction, Request, Response } from "express"
import config from '../config'
import * as jwt from 'jsonwebtoken'
import User from "../models/User"

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization: bearerToken } = req.headers

    if (!bearerToken) return res.status(403).json({ message: 'No hay token' })

    const token = bearerToken.split(' ')[1]

    const decoded = jwt.verify(token, config.SECRET)
    req.userId = decoded.sub
    console.log(decoded.sub)

    const countUserSaved = await User.count({ _id: req.userId })

    if (countUserSaved === 0) return res.status(404).json({ message: 'No se encontro usuario' })
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: 'Unauthorized' })
  }
}
