import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { Toaster } from "react-hot-toast";

function MainLayout() {
    return (
        <AuthProvider>
            <CartProvider>
                <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
                    <Navbar />
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            className:
                                "!rounded-xl !border !border-slate-200/80 !bg-white !text-slate-800 !shadow-lg",
                        }}
                    />
                    <Outlet />
                </div>
            </CartProvider>
        </AuthProvider>
    );
}

export default MainLayout;