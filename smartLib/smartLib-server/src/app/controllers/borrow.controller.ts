import express, { Request, Response, Router } from "express";
import { handleValidationError } from "../../utils/errorHandler";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes: Router = express.Router();

// Create Borrow Record
borrowRoutes.post("/", async (req: Request, res: Response): Promise<void> => {
  const { book, quantity, dueDate } = req.body;

  try {
    const updatedBook = await Book.updateCopiesAndAvailability(book, quantity);

    if (!updatedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        error: "Invalid book ID",
      });
      return;
    }

    if (updatedBook === "NOT_ENOUGH_COPIES") {
      res.status(400).json({
        success: false,
        message: "Not enough copies available",
        error: "Requested quantity exceeds available copies",
      });
      return;
    }

    const borrow = await Borrow.create({ book, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    handleValidationError(error, res, "Error borrowing book");
  }
});


// Borrowed Books Aggregation
borrowRoutes.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
          _id: false
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    handleValidationError(error, res, "Error fetching borrow summary");
  }
});
