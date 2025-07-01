import App from "@/App";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        element: <h2>Welcome</h2>,
      },
    ],
  },
]);
