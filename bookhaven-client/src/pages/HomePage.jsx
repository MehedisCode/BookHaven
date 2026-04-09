import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard"
import ProductDetails from "../components/ProductDetails";

const BASE_URL = "http://localhost:5106";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}/api/Product`)
            .then((r) => { if (!r.ok) throw new Error("Failed"); return r.json(); })
            .then(setProducts)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    if (selected) {
        return <ProductDetails product={selected} onBack={() => setSelected(null)} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-100 px-6 py-10">
                <div className="max-w-4xl">
                    <h1 className="text-3xl font-medium text-gray-900 mb-2">Featured books</h1>
                    <p className="text-sm text-gray-500">
                        Hand-picked titles across every genre — discover your next great read.
                    </p>
                </div>
            </div>

            <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                    {!loading && !error ? `${products.length} books` : ""}
                </p>
                <a href="#" className="text-sm text-indigo-600 hover:underline">View all →</a>
            </div>

            <div className="px-6 py-8">
                {loading && (
                    <div className="flex items-center gap-2 text-sm text-gray-400 py-12 justify-center">
                        <div className="w-4 h-4 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></div>
                        Loading products...
                    </div>
                )}

                {error && (
                    <div className="text-center py-12">
                        <p className="text-sm text-red-500 mb-1">Could not load products.</p>
                        <p className="text-xs text-gray-400">Make sure your API is running at {BASE_URL}</p>
                    </div>
                )}

                {!loading && !error && products.length === 0 && (
                    <p className="text-center text-sm text-gray-400 py-12">No products found.</p>
                )}

                {!loading && !error && products.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} onClick={setSelected} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;