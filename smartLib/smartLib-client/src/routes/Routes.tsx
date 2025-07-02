import App from "@/App";
import AddBook from "@/pages/AddBook";
import AllBooks from "@/pages/AllBooks";
import BookDetails from "@/pages/BookDetails";
import BorrowBook from "@/pages/BorrowBook";
import BorrowSummary from "@/pages/BorrowSummary";
import EditBook from "@/pages/EditBook";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/books",
        Component: AllBooks,
      },
      {
        path: "/create-book",
        Component: AddBook,
      },
      {
        path: "/edit-book/:id",
        Component: EditBook,
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      },
      {
        path: "/borrow/:bookId",
        element: <BorrowBook />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary></BorrowSummary>,
      },
    ],
  },
]);
