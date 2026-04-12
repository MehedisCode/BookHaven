import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function AddToCartButton({
    productId,
    quantity = 1,
    className = "",
    children,
    variant = "primary",
}) {
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [pending, setPending] = useState(false);

    const base =
        variant === "outline"
            ? "border border-gray-200 text-gray-800 hover:bg-gray-50"
            : "bg-indigo-600 text-white hover:bg-indigo-700";

    async function handleClick(e) {
        e.stopPropagation();
        if (!isAuthenticated) {
            toast.error("Please sign in to add items to your cart.");
            navigate("/login");
            return;
        }
        setPending(true);
        try {
            await addToCart(productId, quantity);
            toast.success("Added to cart");
        } catch (err) {
            toast.error(err.message || "Could not add to cart");
        } finally {
            setPending(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={pending}
            className={`rounded-xl text-sm font-medium px-4 py-2.5 transition disabled:opacity-60 ${base} ${className}`}
        >
            {pending ? "Adding…" : children ?? "Add to cart"}
        </button>
    );
}

export default AddToCartButton;
