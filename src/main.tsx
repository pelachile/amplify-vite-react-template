import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import outputs from "../amplify_outputs.json";
import Home from "./Home.tsx";
import "@aws-amplify/ui-react/styles.css";
import { ThemeProvider } from "@aws-amplify/ui-react";

Amplify.configure(outputs);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
