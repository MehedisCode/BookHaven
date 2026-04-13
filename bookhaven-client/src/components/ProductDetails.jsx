import AddToCartButton from "./AddToCartButton";
import PageContainer from "./PageContainer";
import { API_BASE_URL } from "../config/api";

function ProductDetails({ product, onBack }) {
  const price =
    typeof product.price === "number"
      ? product.price
      : parseFloat(product.price) || 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
        <PageContainer className="flex flex-wrap items-center gap-2 py-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            ← Back
          </button>
          <span className="text-slate-300" aria-hidden>
            /
          </span>
          <span className="text-sm text-slate-500">
            {product.category?.name || "Book"}
          </span>
          <span className="text-slate-300" aria-hidden>
            /
          </span>
          <span className="max-w-xs truncate text-sm font-medium text-slate-900">
            {product.title}
          </span>
        </PageContainer>
      </div>

      <PageContainer className="py-10 sm:py-12">
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50">
          <div className="flex flex-col lg:flex-row">
            <div className="relative flex min-h-72 shrink-0 items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/40 lg:w-[22rem]">
              {product.imageUrl ? (
                <img
                  src={`${API_BASE_URL}${product.imageUrl}`}
                  alt=""
                  className="h-full w-full max-h-[28rem] object-cover lg:max-h-none lg:min-h-[24rem]"
                />
              ) : (
                <div className="flex h-48 w-48 items-center justify-center rounded-3xl bg-white shadow-inner">
                  <span className="text-6xl" aria-hidden>
                    📚
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                {product.category?.name || "Book"}
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                {product.title}
              </h1>
              <p className="mt-2 text-lg text-slate-500">by {product.author}</p>

              <div className="mt-8 flex flex-wrap items-end gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Your price
                  </p>
                  <p className="mt-1 text-4xl font-bold tabular-nums text-slate-900">
                    ${price.toFixed(2)}
                  </p>
                </div>
                {product.listPrice != null &&
                product.listPrice > price ? (
                  <div>
                    <p className="text-xs text-slate-400">List price</p>
                    <p className="text-lg text-slate-400 line-through tabular-nums">
                      ${product.listPrice?.toFixed(2)}
                    </p>
                  </div>
                ) : null}
                {product.price100 != null ? (
                  <div className="rounded-2xl bg-amber-50 px-4 py-3 ring-1 ring-amber-100">
                    <p className="text-xs font-medium text-amber-800/80">
                      Bulk (100+)
                    </p>
                    <p className="text-lg font-semibold tabular-nums text-amber-900">
                      ${product.price100?.toFixed(2)}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  ["ISBN", product.isbn || "—"],
                  ["Author", product.author || "—"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3"
                  >
                    <p className="text-xs font-medium text-slate-400">{label}</p>
                    <p className="mt-0.5 text-sm font-medium text-slate-900">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {product.description ? (
                <div className="mt-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    About this book
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {product.description}
                  </p>
                </div>
              ) : null}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <AddToCartButton
                  productId={product.id}
                  className="flex-1 justify-center rounded-xl py-3 text-base shadow-sm sm:flex-none sm:px-10"
                />
                <button
                  type="button"
                  onClick={onBack}
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Keep browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export default ProductDetails;
