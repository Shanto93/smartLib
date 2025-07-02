import App from "@/App";
import AddBook from "@/pages/AddBook";
import AllBooks from "@/pages/AllBooks";
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
    ],
  },
]);
