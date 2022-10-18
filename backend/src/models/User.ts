import { Schema, model, Model } from "mongoose"
import bcrypt from 'bcryptjs'

export interface IUser {
  fullname: string,
  mail: string,
  username: string,
  password: string,
  lastlogin?: Date,
}

interface UserModel extends Model<IUser> {
  encrypPassword(password: string): Promise<string>,
  comparedPassword(password: string, receivedPassword: string): Promise<boolean>,
}

const schema = new Schema<IUser, UserModel>({
  fullname:   { type: String, required: true },
  mail:       { type: String, required: true, unique: true },
  username:   { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  lastlogin:  { type: Date }
}, {
  timestamps: true
})

schema.statics.encrypPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

schema.statics.comparedPassword = async (password: string, receivedPassword: string) => {
  return await bcrypt.compare(receivedPassword, password)
}

export default model<IUser, UserModel>('User', schema)
