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

export default { createReservation };
