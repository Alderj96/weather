import { Schema, model, Document } from "mongoose"
import { IUser } from "./User"

interface ITodo extends Document {
  description: string,
  finished: boolean
  datefinished: Date,
  user: IUser
}

const schema = new Schema<ITodo>({
  description:      { type: String, required: true },
  finished:         { type: Boolean, default: false },
  datefinished:     { type: Date },
  user:             { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
})

export default model<ITodo>('Todo', schema)
