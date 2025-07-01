import mongoose, { type Model } from "mongoose";
import type { BookStatic, IBook } from "../interfaces/book.interfaces";

const bookSchema = new mongoose.Schema<IBook, BookStatic>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: [true, "Genre is required"],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: [true, "ISBN must be unique"],
      trim: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.static("updateCopiesAndAvailability", async function (bookId: string, quantity: number) {
  const book = await this.findById(bookId);
  if (!book) return null;

  if (book.copies < quantity) {
    return "NOT_ENOUGH_COPIES";
  }

  book.copies -= quantity;
  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();
  return book;
});

bookSchema.static("postDoc", async function (title: string): Promise<string> {
  return title;
});

bookSchema.post("findOneAndDelete", function (doc, next) {
  if (doc) {
    console.log(`Book with ID ${doc._id} was deleted`);
  } else {
    console.log("No book found to delete.");
  }
  next();
});

export const Book = mongoose.model<IBook, BookStatic>("Book", bookSchema);
