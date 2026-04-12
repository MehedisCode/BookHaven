import AddToCartButton from "./AddToCartButton";
import { API_BASE_URL } from "../config/api";

function ProductCard({ product, onClick }) {
    return (
        <div
            onClick={() => onClick(product)}
            className="border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 bg-white cursor-pointer"
        >
            <div className="w-full h-44 flex items-center justify-center relative bg-gray-50">
                {product.imageUrl ? (
                    <img
                        src={`${API_BASE_URL}${product.imageUrl}`}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <span className="text-2xl">📚</span>
                    </div>
                )}
            </div>

            <div className="px-3 pt-3 pb-1">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    {product.category?.name || "Book"}
                </p>
                <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 mb-2.5">by {product.author}</p>
                <p className="text-xs text-gray-400">
                    List Price: ${product.listPrice?.toFixed(2)}
                </p>
            </div>

            <div className="px-3 pb-2 flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400">As low as ${product.price100?.toFixed(2)}</span>
                <span className="text-xs px-3 py-1.5 border border-indigo-300 text-indigo-600 rounded-lg">
                    View details
                </span>
            </div>

            <div
                className="px-3 pb-3"
                onClick={(e) => e.stopPropagation()}
            >
                <AddToCartButton
                    productId={product.id}
                    className="w-full py-2 text-xs"
                />
            </div>
        </div>
    );
}

export default ProductCard;