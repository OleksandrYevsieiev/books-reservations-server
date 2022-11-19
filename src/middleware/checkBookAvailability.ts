import { NextFunction, Request, Response } from 'express';

import Book from '../models/Book';
import Reservation from '../models/Reservation';

export const checkBookAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { book_id } = req.query;
    const { user_name } = req.body;

    const sufficientBooks = await Book.find({ book_id, count: { $gte: 1 } });
    const usersReservations = await Reservation.find({ user_name, book_id });

    if (usersReservations.length) {
      return res.status(400).json({ error: 'User has already reserved this book' });
    }

    if (!sufficientBooks.length) {
      return res.status(400).json({ error: 'No more books of this title in the storage' });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
