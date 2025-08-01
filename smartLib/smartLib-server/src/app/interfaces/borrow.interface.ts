import type { Model, Types } from "mongoose";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface BorrowModel extends Model<IBorrow> {}
