import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated, role, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-blue-600 p-4 flex gap-6 items-center">
            <Link to="/" className="text-white font-bold hover:underline">Home</Link>

            {/* Admin-only dropdown */}
            {isAuthenticated && role === "Admin" && (
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setOpen((p) => !p)}
                        className="text-white hover:text-gray-200 font-bold flex items-center gap-1 focus:outline-none"
                    >
                        Content Management
                        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {open && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded shadow-lg z-50">
                            <Link to="/category" onClick={() => setOpen(false)}
                                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium">
                                Category
                            </Link>
                            <Link to="/product" onClick={() => setOpen(false)}
                                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium">
                                Products
                            </Link>
                        </div>
                    )}
                </div>
            )}

            <Link to="/privacy" className="text-white font-bold hover:underline">Privacy</Link>

            {/* Auth buttons */}
            <div className="ml-auto flex items-center gap-4">
                {isAuthenticated ? (
                    <>
                        <span className="text-blue-200 text-sm">{role}</span>
                        <button onClick={logout}
                            className="text-white font-bold hover:underline">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-white font-bold hover:underline">Login</Link>
                        <Link to="/register" className="text-white font-bold hover:underline">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;