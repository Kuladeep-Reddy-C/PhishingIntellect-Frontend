// src/pages/Login.jsx
import React, { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import DecryptedText from "../components/DecryptedText";
import Dither from "../components/Dither";
// import logo from "../assets/sticker.png"; // optional if you need later

export default function Login() {
    const [mode, setMode] = useState("sign-in"); // "sign-in" | "sign-up"
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        isLoaded: signInLoaded,
        signIn,
        setActive: setActiveSignIn,
    } = useSignIn();
    const {
        isLoaded: signUpLoaded,
        signUp,
        setActive: setActiveSignUp,
    } = useSignUp();

    const navigate = useNavigate();
    const isAuthLoaded = mode === "sign-in" ? signInLoaded : signUpLoaded;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // ---- Email / password submit ----
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (mode === "sign-in") {
                if (!signInLoaded) return;

                const result = await signIn.create({
                    identifier: form.email,
                    password: form.password,
                });

                if (result.status === "complete") {
                    await setActiveSignIn({ session: result.createdSessionId });
                    navigate("/", { replace: true }); // `/` will route based on role
                } else {
                    setError("Additional verification is required.");
                }
            } else {
                if (!signUpLoaded) return;

                const result = await signUp.create({
                    firstName: form.firstName || undefined,
                    lastName: form.lastName || undefined,
                    emailAddress: form.email,
                    password: form.password,
                });

                if (result.status === "complete") {
                    await setActiveSignUp({ session: result.createdSessionId });
                    navigate("/", { replace: true });
                } else {
                    setError("Additional verification is required.");
                }
            }
        } catch (err) {
            console.error(err);
            setError(
                err.errors?.[0]?.message || err.message || "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    // ---- OAuth SSO handlers ----
    const handleOAuth = async (provider) => {
        try {
            if (!signInLoaded) return;
            setError("");

            await signIn.authenticateWithRedirect({
                strategy: `oauth_${provider}`, // "google" | "github" | "microsoft"
                redirectUrl: "/sso-callback", // or "/"
                redirectUrlComplete: "/", // goes to `/`, then Auth.jsx does role routing
            });
        } catch (err) {
            console.error(err);
            setError(
                err.errors?.[0]?.message || err.message || "SSO sign-in failed."
            );
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] relative overflow-hidden">
            {/* LEFT SIDE: New styling + OLD Dither effect */}
            <div className="relative hidden lg:flex overflow-hidden">
                {/* Real Dither from ../components/Dither with old props */}
                <div className="absolute inset-0">
                    <Dither
                        waveColor={[0.2, 0.2, 0.4]}
                        waveAmplitude={0.35}
                        waveFrequency={3}
                        waveSpeed={0.05}
                        colorNum={4}
                        mouseRadius={0.4}
                        disableAnimation={false}
                        enableMouseInteraction={true}
                    />
                </div>

                {/* Gradient overlay for smooth blend to right */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950/40" />

                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)`,
                        backgroundSize: "50px 50px",
                    }}
                />

                {/* Main content */}
                <div className="relative z-10 h-full w-full flex flex-col justify-center px-16 text-slate-50">
                    {/* Decorative badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm w-fit mb-8">
                        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                        <span className="text-xs font-medium text-indigo-300">
                            Enterprise Security Platform
                        </span>
                    </div>

                    {/* Heading */}
                    <DecryptedText
                        text="Secure. Smart. Modern."
                        speed={140}
                        maxIterations={30}
                        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
                        className="text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-50 via-indigo-200 to-slate-300 bg-clip-text text-transparent"
                        encryptedClassName="opacity-60"
                        parentClassName="mb-6"
                        animateOn="view"
                        revealDirection="center"
                    />

                    {/* Subtitle */}
                    <DecryptedText
                        text="PhishingTool Dashboard"
                        speed={160}
                        maxIterations={32}
                        characters="ABCD1234!?"
                        className="text-2xl font-semibold text-indigo-300/90"
                        encryptedClassName="opacity-60"
                        parentClassName="mb-8"
                        animateOn="view"
                        revealDirection="start"
                    />

                    {/* Description */}
                    <div className="max-w-xl space-y-4 text-slate-300/80">
                        <DecryptedText
                            text="Monitor sessions, detect anomalies, and keep your users safe with advanced threat intelligence."
                            speed={150}
                            maxIterations={35}
                            className="text-base leading-relaxed"
                            encryptedClassName="opacity-70"
                            parentClassName=""
                            animateOn="view"
                            revealDirection="center"
                        />
                    </div>

                    {/* Feature highlights */}
                    <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl">
                        {[
                            { icon: "🛡️", label: "Real-time Protection", value: "99.9%" },
                            { icon: "⚡", label: "Response Time", value: "<100ms" },
                            { icon: "🔒", label: "Encrypted", value: "256-bit" },
                        ].map((item, i) => (
                            <div key={i} className="group">
                                <div className="p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 hover:border-indigo-500/30 transition-all duration-300">
                                    <div className="text-2xl mb-2">{item.icon}</div>
                                    <div className="text-xs text-slate-400 mb-1">{item.label}</div>
                                    <div className="text-lg font-bold text-indigo-300">
                                        {item.value}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Floating particles */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(15)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-indigo-400/40 rounded-full animate-pulse"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${Math.random() * 2 + 2}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Right edge gradient for seamless blend */}
                <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
            </div>

            {/* RIGHT SIDE: keep your Clerk auth card (older code styling) */}
            <div className="flex items-center justify-center px-4 py-10 lg:px-8 relative">
                {/* Optional subtle background glow to match left */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-transparent pointer-events-none" />

                <div className="w-full max-w-lg bg-slate-900/85 border border-slate-800 rounded-3xl shadow-2xl p-8 relative z-10">
                    {/* Toggle Login / Sign up */}
                    <div className="flex mb-8 rounded-2xl bg-slate-900/90 p-1">
                        <button
                            type="button"
                            onClick={() => setMode("sign-in")}
                            className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition
                                ${mode === "sign-in"
                                    ? "bg-slate-800 text-slate-100"
                                    : "text-slate-400 hover:text-slate-100"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode("sign-up")}
                            className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition
                                ${mode === "sign-up"
                                    ? "bg-slate-800 text-slate-100"
                                    : "text-slate-400 hover:text-slate-100"
                                }`}
                        >
                            Sign up
                        </button>
                    </div>

                    <h1 className="text-2xl lg:text-3xl font-semibold text-slate-100">
                        {mode === "sign-in" ? "Welcome back" : "Create your account"}
                    </h1>
                    <p className="mt-1 text-xs text-slate-400">
                        {mode === "sign-in"
                            ? "Sign in to continue to your dashboard."
                            : "Fill in the details below to get started."}
                    </p>

                    {/* SSO buttons */}
                    <div className="mt-6 space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                type="button"
                                onClick={() => handleOAuth("google")}
                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-900/80 transition"
                            >
                                <span className="h-5 w-5 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-slate-900">
                                    G
                                </span>
                                Google
                            </button>
                            <button
                                type="button"
                                onClick={() => handleOAuth("github")}
                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-900/80 transition"
                            >
                                <span className="h-5 w-5 rounded-full bg-slate-900 flex items-center justify-center text-[11px] font-bold text-slate-100">
                                    GH
                                </span>
                                GitHub
                            </button>
                            <button
                                type="button"
                                onClick={() => handleOAuth("microsoft")}
                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-900/80 transition"
                            >
                                <span className="h-5 w-5 rounded-[6px] bg-sky-500 flex items-center justify-center text-[11px] font-bold text-white">
                                    MS
                                </span>
                                Microsoft
                            </button>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                            <span className="h-px flex-1 bg-slate-800" />
                            <span>or continue with email</span>
                            <span className="h-px flex-1 bg-slate-800" />
                        </div>
                    </div>

                    {/* EMAIL / PASSWORD FORM */}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {mode === "sign-up" && (
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-slate-300">
                                        First name <span className="text-slate-500">(optional)</span>
                                    </label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
                                        placeholder="First name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-300">
                                        Last name <span className="text-slate-500">(optional)</span>
                                    </label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
                                        placeholder="Last name"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-medium text-slate-300">
                                Email address
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
                                placeholder="Enter your password"
                            />
                        </div>

                        {error && (
                            <div className="rounded-xl border border-red-500/50 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !isAuthLoaded}
                            className="w-full inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-indigo-500/30 transition"
                        >
                            {loading
                                ? mode === "sign-in"
                                    ? "Logging in..."
                                    : "Creating account..."
                                : mode === "sign-in"
                                    ? "Sign in"
                                    : "Sign up"}
                        </button>
                    </form>

                    {/* Small text links */}
                    {mode === "sign-in" ? (
                        <p className="mt-4 text-xs text-slate-500">
                            Don&apos;t have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setMode("sign-up")}
                                className="text-indigo-400 hover:text-indigo-300 underline-offset-2 hover:underline"
                            >
                                Sign up
                            </button>
                        </p>
                    ) : (
                        <p className="mt-4 text-xs text-slate-500">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setMode("sign-in")}
                                className="text-indigo-400 hover:text-indigo-300 underline-offset-2 hover:underline"
                            >
                                Log in
                            </button>
                        </p>
                    )}

                    <p className="mt-6 text-[10px] text-slate-500 text-center">
                        Secured by <span className="font-semibold">Clerk</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
    