import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";
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

    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, testRole }),
    });

    if (!res.ok) {
      setError("Invalid email or password.");
      return;
    }

    const data = await res.json();
    login(data.token);
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-amber-50/40 px-4 py-14 sm:px-6">
      <div
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 translate-x-1/3 -translate-y-1/4 rounded-full bg-indigo-200/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 -translate-x-1/4 translate-y-1/4 rounded-full bg-amber-200/35 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-md">
        <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl shadow-indigo-900/10 backdrop-blur-md sm:p-10">
          <div className="mb-8 text-center sm:text-left">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-lg font-bold text-white shadow-md shadow-indigo-600/30 sm:mx-0">
              B
            </div>
            <p className="text-sm font-semibold text-indigo-600">BookHaven</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Sign in to save your cart and track orders.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-3">
            <p className="text-xs font-medium text-amber-900">Dev only — role</p>
            <div className="mt-2 flex gap-2">
              {TEST_ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setTestRole(r)}
                  className={`flex-1 rounded-xl border py-2 text-xs font-medium transition ${
                    testRole === r
                      ? "border-amber-500 bg-amber-500 text-white shadow-sm"
                      : "border-amber-200/80 bg-white text-amber-800 hover:bg-amber-50"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {error ? (
            <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label
                htmlFor="login-email"
                className="mb-1.5 block text-xs font-medium text-slate-500"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-1.5 block text-xs font-medium text-slate-500"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <Button type="submit" className="mt-1 w-full justify-center">
              Sign in as {testRole}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
