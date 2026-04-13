import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import PageContainer from "../components/PageContainer";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function CartSkeleton() {
  return (
    <div className="space-y-4 lg:col-span-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
        >
          <div className="h-24 w-20 shrink-0 animate-pulse rounded-xl bg-slate-100" />
          <div className="flex-1 space-y-3 py-1">
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-100" />
            <div className="h-3 w-1/3 animate-pulse rounded-full bg-slate-100" />
            <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CartPage() {
  const { cart, loading, error, fetchCart, checkoutCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const cartItems = useMemo(
    () => cart?.items ?? cart?.Items ?? [],
    [cart]
  );
  const subtotal = cart?.subtotal ?? cart?.Subtotal ?? 0;

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart().catch(() => {});
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

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 sm:py-12">
      <PageContainer>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Your cart
            </h1>
            <p className="mt-1 text-slate-500">
              Review quantities before you check out.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
          >
            <span aria-hidden>←</span> Continue shopping
          </Link>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
            <CartSkeleton />
            <div className="hidden h-64 animate-pulse rounded-2xl border border-slate-100 bg-white shadow-sm lg:block" />
          </div>
        ) : null}

        {error ? (
          <div className="mt-10 rounded-2xl border border-red-100 bg-red-50/90 px-6 py-10 text-center">
            <p className="font-medium text-red-800">{error}</p>
            <button
              type="button"
              onClick={fetchCart}
              className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Try again
            </button>
          </div>
        ) : null}

        {!loading && !error && cartItems.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-slate-100 bg-white px-8 py-16 text-center shadow-sm shadow-slate-200/40">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
              <span aria-hidden>🛒</span>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-slate-900">
              Your cart is empty
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
              When you add books, they’ll show up here with covers and line
              totals.
            </p>
            <Button as={Link} to="/" className="mt-8" size="lg">
              Browse books
            </Button>
          </div>
        ) : null}

        {!loading && !error && cartItems.length > 0 ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
            <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/50 sm:p-6">
              <ul className="divide-y divide-slate-100">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                    <CartItem item={item} />
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-indigo-900/5 ring-1 ring-indigo-50">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Order summary
                </h2>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <dt>Items ({cartItems.length})</dt>
                    <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <dt>Shipping</dt>
                    <dd className="text-slate-400">Calculated at checkout</dd>
                  </div>
                </dl>
                <div className="mt-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-amber-50/60 p-4 ring-1 ring-indigo-100/80">
                  <p className="text-xs font-medium uppercase tracking-wider text-indigo-800/80">
                    Total
                  </p>
                  <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight text-slate-900">
                    ${subtotal.toFixed(2)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Tax may apply.</p>
                </div>
                <Button
                  type="button"
                  className="mt-6 w-full justify-center"
                  size="lg"
                  disabled={isCheckingOut}
                  onClick={handleCheckout}
                >
                  {isCheckingOut ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Processing…
                    </span>
                  ) : (
                    "Proceed to checkout"
                  )}
                </Button>
                <p className="mt-4 text-center text-xs text-slate-400">
                  Secure checkout · Encrypted connection
                </p>
              </div>
            </aside>
          </div>
        ) : null}
      </PageContainer>
    </div>
  );
}

export default CartPage;
