import React from "react";
import ReactDOM from "react-dom/client";
import router from "./routes/AppRoutes";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </CartProvider>
  </AuthProvider>
);