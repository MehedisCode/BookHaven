import { useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

function CartItem({ item }) {
    const { updateQuantity, removeItem } = useCart();
    const [busy, setBusy] = useState(false);

    async function changeQty(next) {
        if (next < 1) return;
        setBusy(true);
        try {
            await updateQuantity(item.id, next);
        } catch (e) {
            toast.error(e.message || "Update failed");
        } finally {
            setBusy(false);
        }
    }

    async function handleRemove() {
        setBusy(true);
        try {
            await removeItem(item.id);
            toast.success("Removed from cart");
        } catch (e) {
            toast.error(e.message || "Remove failed");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-5 border-b border-gray-100 last:border-0">
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {item.productTitle}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                    ${item.price?.toFixed(2)} each
                </p>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden">
                    <button
                        type="button"
                        disabled={busy || item.quantity <= 1}
                        onClick={() => changeQty(item.quantity - 1)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent text-sm"
                    >
                        −
                    </button>
                    <span className="px-3 py-2 text-sm tabular-nums text-gray-900 min-w-[2.5rem] text-center">
                        {item.quantity}
                    </span>
                    <button
                        type="button"
                        disabled={busy}
                        onClick={() => changeQty(item.quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-40 text-sm"
                    >
                        +
                    </button>
                </div>

                <p className="text-sm font-medium text-gray-900 tabular-nums w-24 text-right">
                    ${item.lineTotal?.toFixed(2)}
                </p>

                <button
                    type="button"
                    disabled={busy}
                    onClick={handleRemove}
                    className="text-xs text-red-600 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 disabled:opacity-50"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}

export default CartItem;
