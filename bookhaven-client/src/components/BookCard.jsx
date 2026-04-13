import AddToCartButton from "./AddToCartButton";
import { API_BASE_URL } from "../config/api";

function BookCard({
  product,
  onCardClick,
  onClick,
  showAddToCart = true,
  footer,
  className = "",
}) {
  const openDetails = onCardClick ?? onClick;
  const price =
    typeof product.price === "number"
      ? product.price
      : parseFloat(product.price) || 0;
  const listPrice =
    typeof product.listPrice === "number"
      ? product.listPrice
      : parseFloat(product.listPrice);

  return (
    <article
      role={openDetails ? "button" : undefined}
      tabIndex={openDetails ? 0 : undefined}
      onClick={() => openDetails?.(product)}
      onKeyDown={(e) => {
        if (!openDetails) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDetails(product);
        }
      }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-100/80 bg-white shadow-sm shadow-slate-200/40 transition duration-300 hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/10 ${openDetails ? "cursor-pointer" : ""} ${className}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-slate-50 to-indigo-50/30">
        {product.imageUrl ? (
          <img
            src={`${API_BASE_URL}${product.imageUrl}`}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-5xl opacity-80 transition group-hover:scale-110" aria-hidden>
              📚
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-indigo-600/90">
          {product.category?.name || "Book"}
        </p>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-slate-900">
          {product.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">by {product.author}</p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-semibold tabular-nums text-slate-900">
            ${price.toFixed(2)}
          </span>
          {listPrice != null && listPrice > price ? (
            <span className="text-sm text-slate-400 line-through tabular-nums">
              ${listPrice.toFixed(2)}
            </span>
          ) : null}
        </div>

        {footer ? (
          <div
            className={`space-y-2 ${showAddToCart ? "mt-4" : "mt-auto pt-4"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {footer}
          </div>
        ) : null}
        {showAddToCart ? (
          <div
            className={`mt-auto ${footer ? "pt-3" : "pt-4"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <AddToCartButton
              productId={product.id}
              className="w-full justify-center rounded-xl text-sm shadow-sm"
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default BookCard;
