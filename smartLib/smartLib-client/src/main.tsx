// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import { RouterProvider } from "react-router";
// import { router } from "./routes/Routes.tsx";
// import { Provider } from "react-redux";
// import { store } from "./redux/store.ts";
// import { Toaster } from "sonner";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <Provider store={store}>
//       <Toaster position="top-center"><RouterProvider router={router} /></Toaster>
//     </Provider>
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </Provider>
  </StrictMode>
);
