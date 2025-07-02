export interface IBook {
  _id?: string;
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

export interface IBorrow {
  book: string;
  quantity: number;
  dueDate: string;
}

export interface IError {
  data: {
    error: string;
    message: string;
    success: boolean;
  };
}
