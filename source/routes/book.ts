import express from 'express';
import controller from '../controller/book';

const router = express.Router();


router.post('/', controller.createBook);
router.get('/', controller.getAllBooks);
router.get('/:bookId', controller.getoneBooks);
router.put('/:bookId', controller.updateBook);
router.delete('/:bookId', controller.deleteBook);

export = router;

