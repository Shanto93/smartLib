import type { Model } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

export interface BookStatic extends Model<IBook> {
  postDoc(title: string): string;
}

export interface BookStatic extends Model<IBook> {
  postDoc(title: string): Promise<string>;
  updateCopiesAndAvailability(
    bookId: string,
    quantity: number
  ): Promise<IBook | "NOT_ENOUGH_COPIES" | null>;
}
