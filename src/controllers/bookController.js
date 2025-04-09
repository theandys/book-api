// src/controllers/bookController.js
import Book from "../models/bookModel.js";

// @desc Get all books
// @route GET /api/books
// @access 
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Create a new book
// @route POST /api/books
// @access Public
export const createBook = async (req, res) => {    
    try {
        const { title, author, publisher, year } = req.body;

        if (!title || !author || !publisher || !year) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (year < 2000 || year > new Date().getFullYear()) {
            return res.status(400).json({ message: "Year must be between 2000 and current year" });
        }

        const newBook = new Book({ 
            title, 
            author, 
            publisher, 
            year 
        });

        const createdBook  = await newBook.save();
        res.status(201).json(createdBook );
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get book by id
// @route GET /api/books/:id
// @access Public
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            res.status(200).json(book);
        }
        res.status(404).json({ message: "Book not found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Update book by id
// @route PUT /api/books/:id
// @access Public
export const updateBook = async (req, res) => {
    try {
        const { title, author, publisher, year } = req.body;

        if (!title || !author || !publisher || !year) {
            return res.status(400).json({ message: "At least one field must be provided to update" });
        }
        if (year < 2000 || year > new Date().getFullYear()) {
            return res.status(400).json({ message: "Year must be between 2000 and current year" });
        }

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true,
        });

        if (updatedBook ) {
            res.status(200).json(updatedBook );
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Delete book by id
// @route DELETE /api/books/:id
// @access Public
export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (deletedBook ) {
            res.status(200).json({ message: "Book deleted successfully" });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};