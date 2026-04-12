import { Link } from "react-router-dom";

function OrderSuccessPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
            <div className="max-w-md w-full mx-auto bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                
                <h2 className="text-3xl font-medium text-gray-900 mb-4">
                    Order Successful!
                </h2>
                
                <p className="text-gray-600 mb-8">
                    Thank you for your purchase. We have received your order and are currently processing it.
                </p>
                
                <div className="flex flex-col gap-3">
                    <Link
                        to="/"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl text-lg font-medium transition-colors"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        to="/cart"
                        className="w-full bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-100 px-8 py-3.5 rounded-2xl text-lg font-medium transition-colors"
                    >
                        View Empty Cart
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccessPage;
