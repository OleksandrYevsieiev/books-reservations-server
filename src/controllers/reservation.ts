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

const getAllReservations = (req: Request, res: Response, next: NextFunction) => {
  const { page } = req.query;
  const { limit } = req.query;

  const pageNum = parseInt(page as string, 10) || 0;
  const limitNum = parseInt(limit as string, 10) || 0;

  const skipIndex = pageNum * limitNum;

  return Reservation.find()
    .limit(limitNum)
    .skip(skipIndex)
    .then((reservations) => res.status(200).json(reservations))
    .catch((error) => res.status(500).json({ error }));
};

const clearReservations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundReservations = await Reservation.find({ _id: { $in: req.body } });

    const bookIDsOfRemovedResarvations = foundReservations.map((res) => res.book_id);

    const removedReservation = await Reservation.deleteMany({ _id: { $in: req.body } });

    const adjustedBooksNumber = await Book.updateMany({ _id: { $in: bookIDsOfRemovedResarvations } }, { $inc: { count: +req.body.length } });

    if (removedReservation.deletedCount.valueOf() && adjustedBooksNumber) {
      return res.status(202).json({ removedReservation });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default { createReservation, getAllReservations, clearReservations };
