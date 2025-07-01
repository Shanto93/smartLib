import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { handleValidationError } from "../../utils/errorHandler";
export const bookRoutes = express.Router();

// Create a new book
bookRoutes.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const title = await Book.postDoc(body.title);
    // const book = await Book.create(body);
    const book = new Book(body);
    book.title = title;

    await book.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    handleValidationError(error, res, "Error creating book");
  }
});

// GET all books
bookRoutes.get("/", async (req: Request, res: Response) => {
  const filter = req.query.filter as string | undefined;
  const sortBy = req.query.sortBy as string | undefined;
  const sort = req.query.sort as string | undefined;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const parsedLimit = Number(limit);
    const book = await Book.find(filter ? { genre: filter } : {})
      .sort(
        sortBy && (sort === "asc" || sort === "desc")
          ? { [sortBy]: sort === "desc" ? -1 : 1 }
          : {}
      )
      .limit(!isNaN(parsedLimit) ? parsedLimit : 10);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    handleValidationError(error, res, "Error fetching books");
  }
});
// GET a sngle book
bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  try {
    const book = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    handleValidationError(error, res, "Error fetching book");
  }
});

// Update a book
bookRoutes.put("/:bookId", async (req: Request, res: Response): Promise<void> => {
  const bookId = req.params.bookId;
  const body = req.body;

  try {
    const { copies, available } = body;

    if (copies !== undefined && copies < 0) {
      res.status(400).json({
        success: false,
        message: "'copies' cannot be less than 0",
      });
      return;
    }

    if (copies === 0 && available === true) {
      res.status(400).json({
        success: false,
        message: "'copies' is 0, so 'available' cannot be true",
      });
      return;
    }

    if (copies === 0) {
      body.available = false;
    } else if (copies > 0) {
      body.available = true;
    }

    const book = await Book.findOneAndUpdate({ _id: bookId }, body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error: any) {
    handleValidationError(error, res, "Error updating book");
  }
});

// Delete a book
bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  try {
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    handleValidationError(error, res, "Error deleting book");
  }
});
