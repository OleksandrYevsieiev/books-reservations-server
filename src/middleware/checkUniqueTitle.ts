import { NextFunction, Request, Response } from 'express';

import Book from '../models/Book';

export const checkUniqueTitle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundDuplicate = await Book.find({ title: req.body.title });

    if (foundDuplicate.length) {
      return res.status(400).json({ error: 'This book already exists in the library' });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
