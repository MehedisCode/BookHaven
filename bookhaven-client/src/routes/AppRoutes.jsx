import { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages/HomePage"
import PrivacyPage from "../pages/PrivacyPage"
import CategoryPage from "../pages/CategoryPage"
import MainLayout from "../layouts/MainLayout"

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
                path: "/categories",
                element: <CategoryPage />
            }
        ]
    },
])

export default router;