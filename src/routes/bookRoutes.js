import express from 'express';
import {
    getBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
} from '../controllers/bookController.js';

const router = express.Router();

// routes /api/books
router.route('/')
    .get(getBooks)
    .post(createBook);

router.route('/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleteBook);

export default router;