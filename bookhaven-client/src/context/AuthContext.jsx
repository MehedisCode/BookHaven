import { createContext, useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const navigate = useNavigate();

    const user = useMemo(() => {
        if (!token) return null;

        const decoded = jwtDecode(token);

        return {
            role: decoded.role
        };
    }, [token]);

    function login(newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);

        const decoded = jwtDecode(newToken);
        const role = decoded.role;

        navigate(role === "Admin" ? "/product" : "/");
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}