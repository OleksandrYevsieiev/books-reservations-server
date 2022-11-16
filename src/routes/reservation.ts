import express from 'express';
import controller from '../controllers/reservation';

const router = express.Router();

router.post('/', controller.createReservation);

export = router;
