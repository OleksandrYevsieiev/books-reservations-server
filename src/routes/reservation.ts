import express from 'express';

import { checkBookAvailability } from '../middleware/checkBookAvailability';
import controller from '../controllers/reservation';

const router = express.Router();

router.post('/', checkBookAvailability, controller.createReservation);

router.get('/', controller.getAllReservations);

router.delete('/', controller.clearReservation);

export = router;
