import { Schema, model, Document } from 'mongoose'
import { ReservationStatus } from '@devdezyn/hospitality-app-common'

export interface IReservationDocument extends Document {
  status: ReservationStatus
  hourly_rate: number
  expected_checkin_time: Date
  expected_checkout_time: Date
  customer: string
  room_type: string
  weekday_percent: number
  weekend_percent: number
}

const reservationSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      default: ReservationStatus.Created,
      enum: Object.values(ReservationStatus),
    },
    hourly_rate: {
      type: Number,
      required: true,
    },
    weekday_percent: {
      type: Number,
      required: true,
    },
    weekend_percent: {
      type: Number,
      required: true,
    },
    expected_checkin_time: {
      type: Date,
      required: true,
    },
    expected_checkout_time: {
      type: Date,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      // ref: 'User',
      required: [true, 'A customer is required'],
    },
    room_type: {
      type: Schema.Types.ObjectId,
      required: [true, 'A room type is required'],
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

const Reservation = model<IReservationDocument>(
  'Reservation',
  reservationSchema
)

export default Reservation
