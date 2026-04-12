import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function CartPage() {
    const { cart, loading, error, fetchCart, checkoutCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart().catch(() => { });
        }
    }, [isAuthenticated, fetchCart]);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            await checkoutCart();
            toast.success("Order placed successfully!");
            navigate("/order-success");
        } catch (err) {
            toast.error(err.message || "Failed to checkout. Please try again.");
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
                <div className="max-w-md mx-auto text-center px-6">
                    <h2 className="text-3xl font-medium text-gray-900 mb-4">
                        Your Cart is Empty
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Please login to view and manage your shopping cart.
                    </p>
                    <Link
                        to="/login"
                        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl text-lg font-medium"
                    >
                        Login to Continue
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-3xl mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900">Your Cart</h1>
                        <p className="text-gray-500">Review your selected books before checkout</p>
                    </div>
                    <Link
                        to="/"
                        className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center gap-1"
                    >
                        ← Continue Shopping
                    </Link>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="flex items-center gap-3 text-gray-500">
                            <div className="w-6 h-6 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin" />
                            Loading cart...
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={fetchCart}
                            className="mt-4 text-indigo-600 hover:underline"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && (!cart || cart.Items?.length === 0) && (
                    <div className="bg-white rounded-3xl p-16 text-center border border-gray-100">
                        <p className="text-2xl text-gray-600 mb-6">Your cart is empty</p>
                        <Link
                            to="/"
                            className="inline-block bg-indigo-600 text-white px-8 py-3.5 rounded-2xl hover:bg-indigo-700"
                        >
                            Browse Books
                        </Link>
                    </div>
                )}

                {cart?.items?.length > 0 && (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
                        {cart.items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}

                        <div className="border-t border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-center bg-gray-50 rounded-b-3xl gap-4">
                            <div className="flex items-center gap-4">
                                <span className="text-lg text-gray-600">Subtotal</span>
                                <span className="text-3xl font-semibold text-gray-900">
                                    ${cart.subtotal?.toFixed(2) ?? "0.00"}
                                </span>
                            </div>
                            <button 
                                onClick={handleCheckout} 
                                disabled={isCheckingOut}
                                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-8 py-3 rounded-2xl text-lg font-medium transition-colors flex items-center gap-2"
                            >
                                {isCheckingOut ? (
                                    <>
                                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                       Processing...
                                    </>
                                ) : "Proceed to Checkout"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;