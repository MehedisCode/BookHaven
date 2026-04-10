import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "http://localhost:5106";
const TEST_ROLES = ["Customer", "Admin"];

function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [testRole, setTestRole] = useState("Customer");

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        const res = await fetch(`${BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) { setError("Invalid email or password."); return; }

        const data = await res.json();
        login(data.token, testRole);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white border border-gray-100 rounded-2xl p-10 max-w-sm w-full">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                        <span className="text-sm font-medium text-gray-900">BookHaven</span>
                    </div>
                    <h1 className="text-xl font-medium text-gray-900 mb-1">Welcome back</h1>
                    <p className="text-sm text-gray-400">Sign in to your BookHaven account.</p>
                </div>

                {/* Dev role switcher */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-5">
                    <p className="text-xs text-amber-700 font-medium mb-2">Dev only — login as</p>
                    <div className="flex gap-2">
                        {TEST_ROLES.map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setTestRole(r)}
                                className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors ${testRole === r
                                    ? "bg-amber-500 border-amber-500 text-white"
                                    : "bg-white border-amber-200 text-amber-700 hover:bg-amber-50"
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
                        <p className="text-xs text-red-600">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-300"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Password</label>
                        <input
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2.5 bg-indigo-600 text-white text-sm rounded-xl hover:bg-indigo-700 mt-1"
                    >
                        Sign in as {testRole}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-xs text-gray-400 text-center mt-6">
                    Don't have an account?{" "}
                    <a href="/register" className="text-indigo-600 hover:underline">Create one</a>
                </p>

            </div>
        </div>
    );
}

export default Login;