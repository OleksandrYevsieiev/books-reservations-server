import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import Reservation from '../models/Reservation';
import Book from '../models/Book';

const createReservation = async (req: Request, res: Response, next: NextFunction) => {
  const { user_name, start_date, end_date } = req.body;
  const { book_id } = req.query;

  try {
    const createdReservation = await new Reservation({
      _id: new mongoose.Types.ObjectId(),
      book_id,
      user_name,
      start_date,
      end_date
    }).save();

    if (createdReservation) {
      const adjustedBooksNumber = await Book.findByIdAndUpdate(book_id, { $inc: { count: -1 } });

      if (adjustedBooksNumber) {
        return res.status(201).json({ createdReservation });
      }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const returnBooksByTitle = async (req: Request, res: Response, next: NextFunction) => {
  const { book_id } = req.query;

  try {
    const foundBook = await Book.findById(book_id);

    const removedReservation = await Reservation.deleteMany({ book_id: foundBook?._id });

    const adjustedBooksNumber = await Book.updateOne({ _id: foundBook?._id }, { count: foundBook?.total_of_type });

    if (removedReservation.deletedCount.valueOf() && adjustedBooksNumber.modifiedCount.valueOf()) {
      return res.status(202).json({ removedReservation });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export default { createReservation, returnBooksByTitle };
