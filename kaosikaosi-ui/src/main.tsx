import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/home.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authenticate from "./routes/authenticate.tsx";
import ErrorPage from "./routes/error-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [{}],
  },
  {
    path: "authenticate",
    element: <Authenticate />,
  },
]);

async function enableMocking() {
  // return;
  if (import.meta.env.PROD) {
    return;
  }

  const { worker } = await import("./mocks/browser");

  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
