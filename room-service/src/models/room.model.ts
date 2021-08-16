import { Schema, model, Document, HookNextFunction } from 'mongoose'

export interface IRoomDocument extends Document {
  room_type: string
  hourly_rate: number
  weekday_percent: number
  weekend_percent: number
  quantity: number
  available: number
}

const roomSchema = new Schema(
  {
    room_type: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hourly_rate: {
      type: Number,
      required: true,
    },
    weekday_percent: {
      type: Number,
      required: true,
      max: 20,
    },
    weekend_percent: {
      type: Number,
      required: true,
      max: 20,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    available: {
      type: Number,
    },
    archived: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)

roomSchema.pre('save', function (next: HookNextFunction) {
  try {
    const room = this as IRoomDocument

    room.set('available', room.get('quantity'))

    next()
  } catch (error) {
    next(error)
  }
})

const Room = model<IRoomDocument>('Room', roomSchema)

export default Room
