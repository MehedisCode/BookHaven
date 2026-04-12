import React from "react";
import ReactDOM from "react-dom/client";
import router from "./routes/AppRoutes";
import { RouterProvider } from "react-router-dom";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);