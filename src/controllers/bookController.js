// src/controllers/bookController.js
import { get } from "mongoose";
import Book from "../models/bookModel.js";
import ApiError from "../utils/ApiError.js";
import { buildBookFilters, buildBookSorts } from "../utils/filterBuilder.js";
import { paginate, getPaginationMeta } from "../utils/paginateHelper.js";

// @desc Get all books
// @route GET /api/books?keyword=searchTerm&genre=genreName&page=1&pageSize=10
// @access 
export const getBooks = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 10;
        
        const filters = buildBookFilters(req.query);
        const sortBy = buildBookSorts(req.query);
        const { limit, skip } = paginate(req.query, { page, pageSize });

        // query the database
        const totalBooks = await Book.countDocuments(filters);
        const books = await Book.find(filters)
            .sort(sortBy)
            .limit(limit)
            .skip(skip);

        const pagination = getPaginationMeta({ 
            totalItems: totalBooks, 
            page, 
            pageSize 
        });

        res.status(200).json({
            success: true,
            data: books,
            ...pagination,
        });
    } catch (error) {
        next(error);
    }
};

// @desc Create a new book
// @route POST /api/books
// @access Public
export const createBook = async (req, res) => {    
    try {
        const { title, author, publisher, year, description, genre } = req.body;

        if (!title || !author || !publisher || !year) {
            throw new ApiError(400, "Title, author, publisher, and year are required fields");
        }
        if (year < 2000 || year > new Date().getFullYear()) {
            throw new ApiError(400, "Year must be between 2000 and current year");
        }

        const newBook = new Book({ 
            title, 
            author, 
            publisher, 
            year, 
            description,
            genre 
        });
        const createdBook  = await newBook.save();

        res.status(201).json({
            success: true,
            data: createdBook, 
        });
    }
    catch (error) {
        next(error);
    }
};

// @desc Get book by id
// @route GET /api/books/:id
// @access Public
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.status(200).json({
                success: true,
                data: book,
            });
        }
        
        throw new ApiError(404, "Book not found");
    } catch (error) {
        next(error);
    }
};

// @desc Update book by id
// @route PUT /api/books/:id
// @access Public
export const updateBook = async (req, res) => {
    try {
        const { title, author, publisher, year, description, genre } = req.body;

        // if (!title || !author || !publisher || !year) {
        //     throw new ApiError(400, "Title, author, publisher, and year are required fields");
        // }
        if (year < 2000 || year > new Date().getFullYear()) {
            throw new ApiError(400, "Year must be between 2000 and current year");
        }

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true,
        });

        if (updatedBook ) {
            res.status(200).json({ 
                success: true,
                data: updatedBook,
            });
        } 
        
        throw new ApiError(404, "Book not found");
    } catch (error) {
        next(error);
    }
};

// @desc Delete book by id
// @route DELETE /api/books/:id
// @access Public
export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (deletedBook ) {
            res.status(200).json({ 
                success: true,
                message: "Book deleted successfully" 
            });
        }
            
        throw new ApiError(404, "Book not found");
    } catch (error) {
        next(error);
    }
};