import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import BookGridSkeleton from "../components/BookGridSkeleton";
import Button from "../components/ui/Button";
import PageContainer from "../components/PageContainer";
import ProductDetails from "../components/ProductDetails";
import SectionTitle from "../components/SectionTitle";
import { API_BASE_URL } from "../config/api";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/Product?page=${page}&pageSize=8`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((r) => {
        setProducts(r.data);
        setTotalPages(r.totalPages)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/Category`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]))
      .finally(() => setCategoriesLoading(false));
  }, []);

  const sortedCategories = useMemo(
    () =>
      [...categories].sort(
        (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
      ),
    [categories]
  );

  const featuredProducts = useMemo(() => {
    let list = products;
    if (categoryFilter != null) {
      list = products.filter((p) => p.categoryId === categoryFilter);
    }
    return list;
  }, [products, categoryFilter]);

  if (selected) {
    return (
      <ProductDetails product={selected} onBack={() => setSelected(null)} />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden border-b border-indigo-100/60 bg-gradient-to-br from-indigo-50 via-white to-amber-50/40">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-amber-200/25 blur-3xl"
          aria-hidden
        />
        <PageContainer className="relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Curated for readers
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Stories worth staying up for.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Discover fiction, non-fiction, and hidden gems—presented with calm
              layouts and prices you can trust.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button as="a" href="#featured-books" size="lg">
                Explore books
              </Button>
              {/* <Button
                as={Link}
                to="/login"
                variant="outline"
                size="lg"
                className="border-indigo-100"
              >
                Sign in to shop
              </Button> */}
            </div>
          </div>
          <div className="mt-14 grid max-w-lg grid-cols-3 gap-3 sm:max-w-xl sm:gap-4 lg:absolute lg:right-8 lg:top-1/2 lg:mt-0 lg:max-w-md lg:-translate-y-1/2 xl:right-12">
            {["📖", "✨", "🕯️"].map((emoji, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-3xl shadow-md shadow-indigo-900/5 backdrop-blur-sm sm:text-4xl"
              >
                <span aria-hidden>{emoji}</span>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <PageContainer className="py-14 sm:py-16">
        <section aria-labelledby="categories-heading">
          <SectionTitle
            id="categories-heading"
            eyebrow="Browse"
            title="Shop by category"
            subtitle="Jump into a genre—filter the grid below to match your mood."
          />
          {categoriesLoading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-2xl bg-slate-100"
                />
              ))}
            </div>
          ) : sortedCategories.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500">
              Categories will appear here when your catalog is set up.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setCategoryFilter(null);
                    document
                      .getElementById("featured-books")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`flex h-full w-full flex-col items-start rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${categoryFilter === null
                    ? "border-indigo-200 bg-indigo-50/80 ring-2 ring-indigo-500/20"
                    : "border-slate-100 bg-white hover:border-indigo-100"
                    }`}
                >
                  <span className="text-2xl" aria-hidden>
                    📚
                  </span>
                  <span className="mt-3 font-semibold text-slate-900">
                    All books
                  </span>
                  <span className="text-xs text-slate-500">
                    {products.length} titles
                  </span>
                </button>
              </li>
              {sortedCategories.map((c) => {
                const count = products.filter(
                  (p) => p.categoryId === c.id
                ).length;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setCategoryFilter(c.id);
                        document
                          .getElementById("featured-books")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`flex h-full w-full flex-col items-start rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${categoryFilter === c.id
                        ? "border-indigo-200 bg-indigo-50/80 ring-2 ring-indigo-500/20"
                        : "border-slate-100 bg-white hover:border-indigo-100"
                        }`}
                    >
                      <span className="text-2xl" aria-hidden>
                        🏷️
                      </span>
                      <span className="mt-3 font-semibold text-slate-900">
                        {c.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {count} {count === 1 ? "title" : "titles"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section
          id="featured-books"
          className="mt-20 scroll-mt-24"
          aria-labelledby="featured-heading"
        >
          <SectionTitle
            id="featured-heading"
            eyebrow="Featured"
            title="Books we’re loving right now"
            subtitle={
              categoryFilter
                ? "Showing titles in your selected category."
                : "Hand-picked from your catalog—tap a card for details or add to cart."
            }
            action={
              !loading && !error ? (
                <span className="text-sm tabular-nums text-slate-500">
                  {featuredProducts.length}{" "}
                  {featuredProducts.length === 1 ? "book" : "books"}
                </span>
              ) : null
            }
            className="mb-10"
          />

          {loading ? <BookGridSkeleton count={8} /> : null}

          {error ? (
            <div className="rounded-2xl border border-red-100 bg-red-50/80 px-6 py-12 text-center">
              <p className="font-medium text-red-800">
                We couldn’t load products.
              </p>
              <p className="mt-2 text-sm text-red-700/90">
                Confirm your API is running at{" "}
                <span className="font-mono text-xs">{API_BASE_URL}</span>
              </p>
            </div>
          ) : null}

          {!loading && !error && featuredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
              <p className="text-lg font-medium text-slate-800">
                No books in this category yet
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Try another category or add products in the admin console.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-6"
                onClick={() => setCategoryFilter(null)}
              >
                Show all books
              </Button>
            </div>
          ) : null}

          {!loading && !error && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {featuredProducts.map((p) => (
                <BookCard key={p.id} product={p} onClick={setSelected} />
              ))}
            </div>
          ) : null}

          {/* Pagination  */}
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${page === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-200"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </section>

        <section
          className="mt-20 overflow-hidden rounded-3xl border border-indigo-100/80 bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-12 text-center shadow-lg shadow-indigo-900/20 sm:px-12"
          aria-labelledby="cta-heading"
        >
          <h2
            id="cta-heading"
            className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Ready for your next chapter?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-indigo-100">
            Create an account to save your cart and check out faster.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              as="a"
              href="#featured-books"
              variant="accent"
              size="lg"
              className="shadow-md shadow-amber-900/20"
            >
              Explore books
            </Button>
            <Button
              as={Link}
              to="/register"
              variant="outline"
              size="lg"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20"
            >
              Join BookHaven
            </Button>
          </div>
        </section>
      </PageContainer>
    </div>
  );
}

export default HomePage;
