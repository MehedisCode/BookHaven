import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { token, isAuthenticated } = useAuth();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isTokenValid = useCallback((token) => {
        if (!token) return false;
        try {
            const decoded = jwtDecode(token);
            return decoded.exp > Date.now() / 1000;
        } catch {
            return false;
        }
    }, []);

    const authFetch = useCallback(async (url, options = {}) => {

        if (!token || !isTokenValid(token)) {
            throw new Error("Please login to continue.");
        }

        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...options.headers,
            },
        });

        const text = await response.text();
        let data;
        try {
            data = text ? JSON.parse(text) : null;
        } catch {
            data = text;
        }

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Session expired. Please login again.");
            }
            throw new Error(data?.message || data?.title || "Request failed");
        }

        return data;
    }, [token, isTokenValid]);

    // Fetch cart manually (Lazy loading)
    const fetchCart = useCallback(async () => {
        if (!isAuthenticated || !token) {
            setCart(null);
            return null;
        }

        if (!isTokenValid(token)) {
            setError("Session expired. Please login again.");
            setCart(null);
            return null;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await authFetch("/api/cart");
            setCart(data);
            return data;
        } catch (err) {
            setError(err.message);
            setCart(null);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, token, authFetch, isTokenValid]);

    // Only clear cart when user logs out
    useEffect(() => {
        if (!isAuthenticated) {
            setCart(null);
            setError(null);
        }
    }, [isAuthenticated]);

    const addToCart = useCallback(async (productId, quantity = 1) => {
        const data = await authFetch("/api/cart/add", {
            method: "POST",
            body: JSON.stringify({ productId, quantity }),
        });
        setCart(data);
        return data;
    }, [authFetch]);

    const updateQuantity = useCallback(async (cartItemId, quantity) => {
        const data = await authFetch("/api/cart/update", {
            method: "PUT",
            body: JSON.stringify({ cartItemId, quantity }),
        });
        setCart(data);
        return data;
    }, [authFetch]);

    const removeItem = useCallback(async (cartItemId) => {
        const data = await authFetch(`/api/cart/remove/${cartItemId}`, {
            method: "DELETE",
        });
        setCart(data);
        return data;
    }, [authFetch]);

    const checkoutCart = useCallback(async () => {
        const data = await authFetch("/api/checkout", {
            method: "POST",
        });
        await fetchCart();
        return data;
    }, [authFetch, fetchCart]);

    const itemCount = useMemo(() => {
        return cart?.Items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
    }, [cart]);

    const value = useMemo(() => ({
        cart,
        loading,
        error,
        itemCount,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
        checkoutCart,
    }), [cart, loading, error, itemCount, fetchCart, addToCart, updateQuantity, removeItem, checkoutCart]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}