import express from 'express';

import { checkUniqueTitle } from '~/middleware/checkUniqueTitle';
import controller from '../controllers/book';

const router = express.Router();

router.post('/store', checkUniqueTitle, controller.addBooks);
router.get('/', controller.getAllBooks);

export = router;
