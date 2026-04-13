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

  const initial = (item.productTitle || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 gap-4">
        <div
          className="flex h-28 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100/80 to-amber-50 text-2xl font-semibold text-indigo-800 shadow-inner sm:h-24 sm:w-20"
          aria-hidden
        >
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-snug text-slate-900">
            {item.productTitle}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            ${item.price?.toFixed(2)} each
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={handleRemove}
            className="mt-3 text-sm font-medium text-red-600 transition hover:text-red-700 disabled:opacity-50 sm:hidden"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:justify-end">
        <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50/80 shadow-sm">
          <button
            type="button"
            disabled={busy || item.quantity <= 1}
            onClick={() => changeQty(item.quantity - 1)}
            className="px-3 py-2.5 text-slate-600 transition hover:bg-white disabled:opacity-40"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-[2.75rem] px-2 py-2.5 text-center text-sm font-medium tabular-nums text-slate-900">
            {item.quantity}
          </span>
          <button
            type="button"
            disabled={busy}
            onClick={() => changeQty(item.quantity + 1)}
            className="px-3 py-2.5 text-slate-600 transition hover:bg-white disabled:opacity-40"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <p className="min-w-[5.5rem] text-right text-base font-semibold tabular-nums text-slate-900">
          ${item.lineTotal?.toFixed(2)}
        </p>

        <button
          type="button"
          disabled={busy}
          onClick={handleRemove}
          className="hidden text-sm font-medium text-red-600 transition hover:text-red-700 disabled:opacity-50 sm:inline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
