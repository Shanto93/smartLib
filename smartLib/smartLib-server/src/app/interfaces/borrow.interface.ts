import type { Model, Types } from "mongoose";
import type { IBook } from "./book.interfaces";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface BorrowModel extends Model<IBorrow> {}
