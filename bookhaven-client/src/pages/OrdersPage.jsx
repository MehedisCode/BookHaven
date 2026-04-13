import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/orders`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to load orders");
                }
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated && token) {
            fetchOrders();
        } else if (!isAuthenticated) {
            setLoading(false);
        }
    }, [isAuthenticated, token]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-gray-500">
                    <div className="w-6 h-6 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin" />
                    Loading orders...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
                <div className="bg-red-50 text-red-600 p-8 rounded-2xl max-w-md w-full text-center">
                    {error}
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
                <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 max-w-md w-full">
                    <p className="text-xl text-gray-600 mb-6">Please login to view your orders.</p>
                    <Link to="/login" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-2xl hover:bg-indigo-700">
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900">Your Orders</h1>
                        <p className="text-gray-500">Track and manage your recent purchases</p>
                    </div>
                </div>

                {(!orders || orders.length === 0) ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
                        <p className="text-xl text-gray-600 mb-6">You haven't placed any orders yet.</p>
                        <Link to="/" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-2xl hover:bg-indigo-700">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                                    <div>
                                        <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Order ID</p>
                                        <p className="font-medium text-gray-900">#{order.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Date</p>
                                        <p className="font-medium text-gray-900">
                                            {new Date(order.createdAt).toLocaleDateString(undefined, {
                                                year: 'numeric', month: 'long', day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Status</p>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                            {order.status}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Total</p>
                                        <p className="font-bold text-gray-900 text-lg">${order.totalAmount.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Order Items</h4>
                                    {order.items?.map(item => (
                                        <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{item.productTitle}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrdersPage;
