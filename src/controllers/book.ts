import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import Book from '../models/Book';

const addBooks = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, count } = req.body;

  const addedBooks = new Book({
    _id: new mongoose.Types.ObjectId(),
    title,
    description,
    count
  });

  return addedBooks
    .save()
    .then((addedBooks) => res.status(201).json({ addedBooks }))
    .catch((error) => res.status(500).json({ error }));
};

const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
  const { page } = req.query;
  const { limit } = req.query;

  const pageNum = parseInt(page as string, 10) || 0;
  const limitNum = parseInt(limit as string, 10) || 0;

  const skipIndex = pageNum * limitNum;

  return Book.find()
    .limit(limitNum)
    .skip(skipIndex)
    .then((books) => res.status(200).json({ books }))
    .catch((error) => res.status(500).json({ error }));
};

export default { addBooks, getAllBooks };
