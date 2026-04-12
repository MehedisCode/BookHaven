import { createContext, useContext, useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

function isTokenExpired(token) {
    if (!token) return true;
    try {
        const decoded = jwtDecode(token);
        return decoded.exp < Date.now() / 1000;
    } catch {
        return true;
    }
}

function getRoleFromToken(token) {
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        return (
            decoded.role ??
            decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
            null
        );
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const navigate = useNavigate();

    // validate token synchronously before first render
    const [token, setToken] = useState(() => {
        const stored = localStorage.getItem("token")?.trim() || null;
        if (!stored || isTokenExpired(stored)) {
            localStorage.removeItem("token");
            return null;
        }
        return stored;
    });

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setToken(null);
    }, []);

    // auto logout if token expires while app is open
    useEffect(() => {
        if (token && isTokenExpired(token)) {
            logout();
        }
    }, [token, logout]);

    // user is computed synchronously from token — ready on first render
    const user = useMemo(() => {
        if (!token || isTokenExpired(token)) return null;
        return { role: getRoleFromToken(token) };
    }, [token]);

    function login(newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);

        const role = getRoleFromToken(newToken)

        navigate(role === "Admin" ? "/product" : "/");
    }

    return (
        <AuthContext.Provider value={{
            token,
            user,
            role: user?.role ?? null,
            login,
            logout,
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}