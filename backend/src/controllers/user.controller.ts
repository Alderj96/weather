import { Request, Response } from "express"
import User from "../models/User"
import * as jwt from 'jsonwebtoken';
import config from "../config";

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = new User({
      ...req.body,
      password: await User.encrypPassword(req.body.password),
      lastlogin: Date.now()
    })
    const savedUser = await newUser.save()

    const token = jwt.sign({ sub: savedUser._id }, config.SECRET, {
      expiresIn: 86400
    })

    res.json({
      user: {
        username: savedUser.username,
        fullname: savedUser.fullname,
        mail: savedUser.mail,
        lastlogin: savedUser.lastlogin,
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

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, { password: 0 })

    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Ha ocurrido un error'
    })
  }
}
