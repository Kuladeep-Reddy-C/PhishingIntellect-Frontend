import React, { useState } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";

export default function Login() {
    const [mode, setMode] = useState("sign-in");

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-3xl grid md:grid-cols-2 gap-8 items-center">
                {/* Left side text */}
                <div className="hidden md:block text-slate-100">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back 👋
                    </h1>
                    <p className="mt-3 text-slate-400 text-sm">
                        Sign in to continue to your dashboard, or create a new account in a
                        few seconds using Clerk authentication.
                    </p>

                    <ul className="mt-4 space-y-2 text-sm text-slate-400">
                        <li>• Secure authentication managed by Clerk</li>
                        <li>• Works with social logins and email</li>
                        <li>• Redirects to your dashboard based on your role</li>
                    </ul>
                </div>

                {/* Right side auth card */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl p-4 md:p-6">
                    {/* Toggle buttons */}
                    <div className="flex mb-4 rounded-xl bg-slate-900/80 p-1">
                        <button
                            onClick={() => setMode("sign-in")}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition
                                ${mode === "sign-in"
                                    ? "bg-slate-800 text-slate-100"
                                    : "text-slate-400 hover:text-slate-100"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setMode("sign-up")}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition
                                ${mode === "sign-up"
                                    ? "bg-slate-800 text-slate-100"
                                    : "text-slate-400 hover:text-slate-100"
                                }`}
                        >
                            Sign up
                        </button>
                    </div>

                    <div className="mt-2 flex justify-center">
                        {mode === "sign-in" ? (
                            <SignIn
                                // ⬇️ After sign in, go to Auth redirect page (`/`)
                                afterSignInUrl="/"
                                appearance={{
                                    elements: {
                                        card: "bg-transparent shadow-none border-0",
                                    },
                                    variables: {
                                        colorPrimary: "#6366f1",
                                    },
                                }}
                            />
                        ) : (
                            <SignUp
                                // ⬇️ After sign up, also go to Auth redirect page (`/`)
                                afterSignUpUrl="/"
                                appearance={{
                                    elements: {
                                        card: "bg-transparent shadow-none border-0",
                                    },
                                    variables: {
                                        colorPrimary: "#6366f1",
                                    },
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
