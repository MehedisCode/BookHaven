import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="border-t border-slate-200/80 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">

                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-lg font-bold text-white shadow-md shadow-indigo-600/25">B</span>
                            <span className="text-lg font-semibold tracking-tight text-slate-900">BookHaven</span>
                        </Link>
                        <p className="mt-3 text-sm leading-relaxed text-slate-500">
                            Your favorite place to discover and buy books across every genre.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Shop</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-sm text-slate-600 transition hover:text-indigo-600">All books</Link></li>
                            <li><Link to="/bestsellers" className="text-sm text-slate-600 transition hover:text-indigo-600">Bestsellers</Link></li>
                            <li><Link to="/new-releases" className="text-sm text-slate-600 transition hover:text-indigo-600">New releases</Link></li>
                            <li><Link to="/cart" className="text-sm text-slate-600 transition hover:text-indigo-600">My cart</Link></li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Account</h3>
                        <ul className="space-y-2">
                            <li><Link to="/login" className="text-sm text-slate-600 transition hover:text-indigo-600">Sign in</Link></li>
                            <li><Link to="/register" className="text-sm text-slate-600 transition hover:text-indigo-600">Register</Link></li>
                            <li><Link to="/profile" className="text-sm text-slate-600 transition hover:text-indigo-600">My profile</Link></li>
                            <li><Link to="/orders" className="text-sm text-slate-600 transition hover:text-indigo-600">My orders</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Company</h3>
                        <ul className="space-y-2">
                            <li><Link to="/contact" className="text-sm text-slate-600 transition hover:text-indigo-600">Contact us</Link></li>
                            <li><Link to="/privacy" className="text-sm text-slate-600 transition hover:text-indigo-600">Privacy policy</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row">
                    <p className="text-xs text-slate-400">© {new Date().getFullYear()} BookHaven. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link to="/privacy" className="text-xs text-slate-400 transition hover:text-slate-600">Privacy</Link>
                        <Link to="/contact" className="text-xs text-slate-400 transition hover:text-slate-600">Contact</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;