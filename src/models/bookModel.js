// src/models/bukuModel.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters"],
            maxlength: [100, "Title must not exceed 100 characters"],
        },
        author: {
            type: String,
            required: [true, "Author is required"],
            trim: true,
            minlength: [3, "Author must be at least 3 characters"],
            maxlength: [50, "Author must not exceed 50 characters"],
        },
        publisher: {
            type: String,
            required: [true, "Publisher is required"],
            trim: true,
            minlength: [3, "Publisher must be at least 3 characters"],
            maxlength: [50, "Publisher must not exceed 50 characters"],
        },
        year: {
            type: Number,
            required: [true, "Year is required"],
            min: [2000, "Year must be at least 2000"],
            max: [new Date().getFullYear(), "Year must not exceed current year"],
        },
        description: {
            type: String,
            default: "",
        },
        genre: {
            type: String,
            trim: true,
            default: "General",
        },
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model("Book", bookSchema);

export default Book