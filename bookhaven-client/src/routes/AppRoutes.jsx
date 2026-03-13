import { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages/HomePage"
import PrivacyPage from "../pages/PrivacyPage"
import CategoryPage from "../pages/CategoryPage"
import MainLayout from "../layouts/MainLayout"
import ProductPage from "../pages/ProductPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/privacy",
                element: <PrivacyPage />
            },
            {
                path: "/category",
                element: <CategoryPage />
            },
            {
                path: "/product",
                element: <ProductPage />
            }
        ]
    },
])

export default router;