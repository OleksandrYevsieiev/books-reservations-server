import mongoose, { Document, Schema } from 'mongoose';

export interface IBook {
  title: string;
  description: string;
  count: number;
}

export type IBookModel = IBook & Document;

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    count: { type: Number, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model<IBookModel>('Book', BookSchema);
