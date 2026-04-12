import AddToCartButton from "./AddToCartButton";
import { API_BASE_URL } from "../config/api";

function ProductDetails({ product, onBack }) {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Top bar */}
            <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
                >
                    &lt; Back
                </button>
                <span className="text-gray-200">/</span>
                <span className="text-sm text-gray-400">{product.category?.name || "Book"}</span>
                <span className="text-gray-200">/</span>
                <span className="text-sm text-gray-900 truncate max-w-xs">{product.title}</span>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 py-10">
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                    <div className="flex flex-col md:flex-row">

                        {/* Image */}
                        <div className="md:w-80 flex-shrink-0 bg-gray-50 flex items-center justify-center min-h-72">
                            {product.imageUrl ? (
                                <img
                                    src={`${API_BASE_URL}${product.imageUrl}`}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-xl bg-indigo-50 flex items-center justify-center">
                                    <span className="text-4xl">📚</span>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 p-8">

                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                                {product.category?.name || "Book"}
                            </p>

                            <h1 className="text-2xl font-medium text-gray-900 mb-1">{product.title}</h1>
                            <p className="text-sm text-gray-500 mb-6">by {product.author}</p>

                            {/* Pricing */}
                            <p className="text-xs text-gray-400 mb-1">List Price</p>
                            <p className="text-base text-gray-700 font-medium mb-3">
                                ${product.listPrice?.toFixed(2)}
                            </p>

                            <p className="text-xs text-gray-400 mb-1">As low as</p>
                            <p className="text-3xl font-medium text-emerald-700 mb-8">
                                ${product.price100?.toFixed(2)}
                            </p>

                            {/* Meta */}
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {[
                                    ["Category", product.category?.name || "—"],
                                    ["Author", product.author || "—"],
                                    ["List price", "$" + (product.listPrice?.toFixed(2) || "—")],
                                    ["As low as", "$" + (product.price100?.toFixed(2) || "—")],
                                ].map(([label, value]) => (
                                    <div key={label} className="bg-gray-50 rounded-xl px-4 py-3">
                                        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                                        <p className="text-sm font-medium text-gray-900">{value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div className="mb-8">
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">About this book</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2.5">
                                <AddToCartButton
                                    productId={product.id}
                                    className="flex-1"
                                />
                                <button
                                    type="button"
                                    className="px-5 py-2.5 border border-gray-200 text-sm rounded-xl hover:bg-gray-50 text-gray-700"
                                >
                                    Save
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;