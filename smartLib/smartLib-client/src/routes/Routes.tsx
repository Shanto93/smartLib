import App from "@/App";
import AddBook from "@/pages/AddBook";
import AllBooks from "@/pages/AllBooks";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/books",
        Component: AllBooks,
      },
      {
        path: "/addBook",
        Component: AddBook,
      },
    ],
  },
]);
