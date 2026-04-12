import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { Toaster } from "react-hot-toast";

function MainLayout() {
    return (
        <AuthProvider>
            <CartProvider>
                <Navbar />
                <Toaster position="top-right" />
                <Outlet />
            </CartProvider>
        </AuthProvider>
    );
}

export default MainLayout;