import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import Reservation from '~/models/Reservation';

const createReservation = (req: Request, res: Response, next: NextFunction) => {
  const { user_name, start_date, end_date } = req.body;
  const { id } = req.params;

  const createdReservation = new Reservation({
    _id: new mongoose.Types.ObjectId(),
    book_id: id,
    user_name,
    start_date,
    end_date
  });

  return createdReservation
    .save()
    .then((createdReservation) => res.status(201).json({ createdReservation }))
    .catch((error) => res.status(500).json({ error }));
};

export default { createReservation };
