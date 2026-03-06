import { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages/HomePage"
import PrivacyPage from "../pages/PrivacyPage"
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
            }
        ]
    },
])

export default router;