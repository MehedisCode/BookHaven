import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PrivacyPage from "../pages/PrivacyPage";
import CategoryPage from "../pages/CategoryPage";
import MainLayout from "../layouts/MainLayout";
import ProductPage from "../pages/ProductPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../routes/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/privacy", element: <PrivacyPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            {
                path: "/category",
                element: (
                    <ProtectedRoute requiredRole="Admin">
                        <CategoryPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/product",
                element: (
                    <ProtectedRoute requiredRole="Admin">
                        <ProductPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

export default router;