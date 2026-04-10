import { useState } from "react";

const BASE_URL = "http://localhost:5106";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }

        const res = await fetch(`${BASE_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const data = await res.json();
            const messages = Array.isArray(data)
                ? data.map((e) => e.description).join(" ")
                : "Registration failed.";
            setError(messages);
            return;
        }

        setSuccess(true);
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white border border-gray-100 rounded-2xl p-10 max-w-sm w-full text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M4 10l4 4 8-8" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-medium text-gray-900 mb-1">Account created</h2>
                    <p className="text-sm text-gray-400 mb-6">You can now sign in to your account.</p>

                    <a href="/login" className="block w-full py-2.5 bg-indigo-600 text-white text-sm rounded-xl hover:bg-indigo-700 text-center">
                        Go to sign in
                    </a>
                </div>
            </div >
        );
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
                    <h1 className="text-xl font-medium text-gray-900 mb-1">Create an account</h1>
                    <p className="text-sm text-gray-400">Join BookHaven and start reading.</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
                        <p className="text-xs text-red-600">{error}</p>
                    </div>
                )}

                {/* Form */}
                <div className="flex flex-col gap-4">

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
                            placeholder="Min. 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-300"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Confirm password</label>
                        <input
                            type="password"
                            placeholder="Re-enter your password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-300"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full py-2.5 bg-indigo-600 text-white text-sm rounded-xl hover:bg-indigo-700 mt-1"
                    >
                        Create account
                    </button>

                </div>

                {/* Footer */}
                <p className="text-xs text-gray-400 text-center mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-indigo-600 hover:underline">Sign in</a>
                </p>

            </div>
        </div>
    );
}

export default Register;