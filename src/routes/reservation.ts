import express from 'express';

import { checkBookAvailability } from '../middleware/checkBookAvailability';
import controller from '../controllers/reservation';

const router = express.Router();

router.post('/', checkBookAvailability, controller.createReservation);

export = router;
