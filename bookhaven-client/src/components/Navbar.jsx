import { Link, NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
    ? "bg-indigo-50 text-indigo-700"
    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
  }`;

function AvatarDropdown({ role, logout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initial = role?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white shadow-sm shadow-indigo-600/30 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label="Profile menu"
        aria-expanded={open}
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg shadow-slate-200/60">

          {/* Role badge */}
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-xs text-slate-400">Signed in as</p>
            <p className="mt-0.5 text-sm font-medium text-slate-800">{role}</p>
          </div>

          {/* Links */}
          <div className="p-1.5">
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
            >
              <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My profile
            </Link>
            <Link
              to="/orders"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
            >
              <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              My orders
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-slate-100 p-1.5">
            <button
              type="button"
              onClick={() => { setOpen(false); logout(); }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log out
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { itemCount } = useCart();
  const role = user?.role;
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 shadow-sm shadow-slate-200/40 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 rounded-lg outline-none ring-indigo-500/0 transition hover:ring-2 hover:ring-indigo-500/20 focus-visible:ring-2 focus-visible:ring-indigo-500/30"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-lg font-bold text-white shadow-md shadow-indigo-600/25">
            B
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900">BookHaven</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>

          {isAuthenticated ? (
            <NavLink to="/orders" className={navLinkClass}>
              Orders
            </NavLink>
          ) : null}

          {isAuthenticated && role === "Admin" && (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className="flex items-center gap-1 rounded-lg pl-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100/80 hover:text-slate-900"
                aria-expanded={open}
              >
                Admin
                <svg className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open && (
                <div className="absolute left-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-slate-100 bg-white py-1 shadow-lg shadow-slate-200/60">
                  <Link to="/category" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">
                    Categories
                  </Link>
                  <Link to="/product" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">
                    Products
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">

          {/* Cart */}
          <Link
            to={isAuthenticated ? "/cart" : "/login"}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-700"
            aria-label="Shopping cart"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white shadow-sm">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            // ← Avatar dropdown replaces the old role badge + logout button
            <div className="hidden sm:block">
              <AvatarDropdown role={role} logout={logout} />
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/login" className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                Log in
              </Link>
              <Link to="/register" className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-600/25 transition hover:bg-indigo-700">
                Register
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-slate-100 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
              <span className="font-semibold text-slate-900">Menu</span>
              <button
                type="button"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-3">
              <Link to="/" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/privacy" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileOpen(false)}>Privacy</Link>
              {isAuthenticated && (
                <>
                  <Link to="/profile" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileOpen(false)}>My profile</Link>
                  <Link to="/orders" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileOpen(false)}>My orders</Link>
                </>
              )}
              {isAuthenticated && role === "Admin" && (
                <>
                  <Link to="/category" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileOpen(false)}>Admin · Categories</Link>
                  <Link to="/product" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileOpen(false)}>Admin · Products</Link>
                </>
              )}
              <hr className="my-2 border-slate-100" />
              {isAuthenticated ? (
                <>
                  <span className="px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-400">Signed in · {role}</span>
                  <button
                    type="button"
                    className="rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                    onClick={() => { setMobileOpen(false); logout(); }}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileOpen(false)}>Log in</Link>
                  <Link to="/register" className="mx-3 rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-medium text-white" onClick={() => setMobileOpen(false)}>Register</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;