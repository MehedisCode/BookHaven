import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { API_BASE_URL } from "../config/api";

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

    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
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
      <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-amber-50/40 px-4 py-14 sm:px-6">
        <div className="relative mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-white/60 bg-white/90 p-10 text-center shadow-xl shadow-indigo-900/10 backdrop-blur-md">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-100">
              <svg
                width="22"
                height="22"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 10l4 4 8-8"
                  stroke="#059669"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              Account created
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              You can now sign in to your account.
            </p>
            <Button
              as={Link}
              to="/login"
              className="mt-8 w-full justify-center"
            >
              Go to sign in
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-amber-50/40 px-4 py-14 sm:px-6">
      <div
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 translate-x-1/3 -translate-y-1/4 rounded-full bg-indigo-200/40 blur-3xl"
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
              Create an account
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Join BookHaven and start reading.
            </p>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          ) : null}

          <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-4 ${error ? "mt-5" : "mt-6"}`}
          >
            <div>
              <label
                htmlFor="register-email"
                className="mb-1.5 block text-xs font-medium text-slate-500"
              >
                Email
              </label>
              <input
                id="register-email"
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
                htmlFor="register-password"
                className="mb-1.5 block text-xs font-medium text-slate-500"
              >
                Password
              </label>
              <input
                id="register-password"
                type="password"
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="register-confirm"
                className="mb-1.5 block text-xs font-medium text-slate-500"
              >
                Confirm password
              </label>
              <input
                id="register-confirm"
                type="password"
                autoComplete="new-password"
                placeholder="Re-enter your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <Button type="submit" className="mt-1 w-full justify-center">
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
