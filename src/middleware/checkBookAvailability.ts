import { NextFunction, Request, Response } from 'express';

import Book from '../models/Book';

export const checkBookAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { book_id } = req.query;
    const sufficientBooks = await Book.find({ book_id, count: { $gte: 1 } });

    if (!sufficientBooks.length) {
      return res.status(400).json({ error: 'No more books of this title in the storage' });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
