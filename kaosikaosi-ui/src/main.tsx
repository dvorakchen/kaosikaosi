import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/home.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authenticate from "./routes/authenticate.tsx";
import NotFound from "./routes/not-found.tsx";
import Profile from "./routes/porfile.tsx";

import { HomePage } from "./components/homepage/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: ":username",
        element: <Profile />,
      },
    ],
  },
  {
    path: "authenticate",
    element: <Authenticate />,
  },
  {
    path: "notfound",
    element: <NotFound />,
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
