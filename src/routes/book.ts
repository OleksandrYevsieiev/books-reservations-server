import express from 'express';
import controller from '../controllers/book';

const router = express.Router();

router.post('/store', controller.addBooks);
router.get('/', controller.getAllBooks);

export = router;
