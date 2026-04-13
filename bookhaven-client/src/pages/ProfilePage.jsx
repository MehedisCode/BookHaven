import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

function ProfilePage() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const initials = useMemo(() => {
    const source = profile?.userName || profile?.email || "U";
    const parts = source.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }, [profile]);

  const authFetch = useCallback(async (url, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...options,
    });

    const text = await response.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!response.ok) {
      const errorMessage =
        data?.message ||
        (Array.isArray(data?.errors) ? data.errors.join(" ") : null) ||
        data?.title ||
        "Request failed.";
      throw new Error(errorMessage);
    }

    return data;
  }, [token]);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await authFetch("/api/profile");
        setProfile(data);
        setName(data?.userName ?? "");
      } catch (error) {
        toast.error(error.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token, authFetch]);

  const handleSaveName = async (event) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      toast.error("Username must be at least 2 characters.");
      return;
    }

    setSavingName(true);
    try {
      const data = await authFetch("/api/profile/update-name", {
        method: "PUT",
        body: JSON.stringify({ userName: trimmed }),
      });
      setProfile((prev) => ({
        ...prev,
        userName: data?.userName ?? trimmed,
      }));
      toast.success(data?.message || "Account info updated.");
    } catch (error) {
      toast.error(error.message || "Failed to update username.");
    } finally {
      setSavingName(false);
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    setChangingPassword(true);
    try {
      const data = await authFetch("/api/profile/change-password", {
        method: "PUT",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success(data?.message || "Password updated successfully.");
    } catch (error) {
      toast.error(error.message || "Failed to change password.");
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
        <div className="mx-auto flex max-w-5xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-gray-500">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  const role = profile?.role ?? "Customer";
  const roleBadgeClass =
    role === "Admin"
      ? "bg-indigo-100 text-indigo-700 ring-indigo-200"
      : "bg-emerald-100 text-emerald-700 ring-emerald-200";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-lg font-semibold text-white">
              {initials}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-gray-900">
                {profile?.userName || "User"}
              </h1>
              <p className="mt-1 text-sm text-gray-500">{profile?.email || "-"}</p>
            </div>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${roleBadgeClass}`}
            >
              {role}
            </span>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Account info</h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your display name for your BookHaven account.
            </p>
            <form onSubmit={handleSaveName} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="userName"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="userName"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <button
                type="submit"
                disabled={savingName}
                className="inline-flex min-w-28 items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
              >
                {savingName ? "Saving..." : "Save"}
              </button>
            </form>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Change password</h2>
            <p className="mt-1 text-sm text-gray-500">
              Keep your account secure by updating your password regularly.
            </p>
            <form onSubmit={handleChangePassword} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Current password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  New password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Confirm new password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <button
                type="submit"
                disabled={changingPassword}
                className="inline-flex min-w-40 items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
              >
                {changingPassword ? "Updating..." : "Change password"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
