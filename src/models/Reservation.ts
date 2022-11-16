import mongoose, { Document, Schema } from 'mongoose';

export interface IReservation {
  book_id: string;
  user_name: string;
  start_date: string;
  end_date: string;
}

export type IReservationModel = IReservation & Document;

const ReservationSchema: Schema = new Schema(
  {
    book_id: { type: String, required: true },
    user_name: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model<IReservationModel>('Reservation', ReservationSchema);
