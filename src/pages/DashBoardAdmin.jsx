import React, { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function DashboardAdmin() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { signOut } = useClerk();
    const navigate = useNavigate();

    const [role, setRole] = useState(null);
    const [initializingRole, setInitializingRole] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    // Initialize role if not present
    useEffect(() => {
        if (!isLoaded || !isSignedIn || !user) return;

        const currentUnsafe = user.unsafeMetadata || {};
        const existingRole = currentUnsafe.role;

        if (existingRole === "user" || existingRole === "admin") {
            setRole(existingRole);
            setInitializingRole(false);
            return;
        }

        const setDefaultRole = async () => {
            try {
                setSaving(true);
                await user.update({
                    unsafeMetadata: {
                        ...currentUnsafe,
                        role: "user",
                    },
                });
                setRole("user");
                setMessage("Default role set to User.");
            } catch (err) {
                console.error(err);
                setMessage("Could not set default role.");
            } finally {
                setSaving(false);
                setInitializingRole(false);
            }
        };

        setDefaultRole();
    }, [isLoaded, isSignedIn, user]);

    // Handle role toggle
    const handleRoleChange = async (event) => {
        const newRole = event.target.value;

        try {
            setSaving(true);
            const currentUnsafe = user.unsafeMetadata || {};
            await user.update({
                unsafeMetadata: {
                    ...currentUnsafe,
                    role: newRole,
                },
            });

            setRole(newRole);
            setMessage(`Role updated to: ${newRole}`);
        } catch (err) {
            console.error(err);
            setMessage("Failed to update role.");
        } finally {
            setSaving(false);
        }
    };

    // 🔥 LOGOUT FUNCTION
    const handleLogout = async () => {
        await signOut();       // Clerk logout
        navigate("/login");    // Redirect user to login
    };

    // Auth guard
    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-200">
                Loading dashboard...
            </div>
        );
    }

    if (!isSignedIn || !user) {
        return <Navigate to="/login" replace />;
    }

    const primaryEmail = user.primaryEmailAddress?.emailAddress;
    const createdAt = user.createdAt
        ? new Date(user.createdAt).toLocaleString()
        : "Unknown";

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* HEADER + LOGOUT BUTTON */}
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Welcome back,{" "}
                            <span className="font-semibold">
                                {user.firstName || user.username || "User"}
                            </span>.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs text-slate-400">
                            User ID: <span className="font-mono text-[11px]">{user.id}</span>
                        </div>

                        {/* 🎉 LOGOUT BUTTON */}
                        <button
                            onClick={handleLogout}
                            className="rounded-xl bg-red-500 hover:bg-red-400 active:bg-red-600
                         px-4 py-2 text-sm font-medium shadow-md shadow-red-500/30 transition"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* MAIN GRID */}
                <div className="grid gap-6 md:grid-cols-3">

                    {/* USER INFO CARD */}
                    <div className="md:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
                        <h2 className="text-sm font-semibold tracking-wide text-slate-300 uppercase">
                            Profile
                        </h2>

                        <div className="mt-4 space-y-2 text-sm">
                            <p>
                                <span className="text-slate-400">Name:</span>{" "}
                                <span className="font-medium">{user.fullName || "—"}</span>
                            </p>
                            <p>
                                <span className="text-slate-400">Email:</span>{" "}
                                <span className="font-mono">{primaryEmail || "—"}</span>
                            </p>
                            <p>
                                <span className="text-slate-400">Created at:</span>{" "}
                                <span className="font-mono">{createdAt}</span>
                            </p>
                        </div>
                    </div>

                    {/* ROLE CARD */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
                        <h2 className="text-sm font-semibold tracking-wide text-slate-300 uppercase">
                            Role & Metadata
                        </h2>

                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400">Your Role</span>

                                {initializingRole ? (
                                    <span className="text-xs text-slate-500">Initializing...</span>
                                ) : (
                                    <select
                                        value={role || "user"}
                                        onChange={handleRoleChange}
                                        disabled={saving}
                                        className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs
                               focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                )}
                            </div>

                            {saving && (
                                <p className="text-xs text-indigo-400">Saving...</p>
                            )}

                            {message && (
                                <p className="text-xs text-emerald-400">{message}</p>
                            )}

                            <div className="mt-4">
                                <p className="text-xs text-slate-400 font-semibold">unsafeMetadata:</p>
                                <pre className="mt-1 rounded-xl bg-slate-950/70 text-[11px] p-3 border border-slate-800 max-h-40 overflow-auto">
                                    {JSON.stringify(user.unsafeMetadata || {}, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
