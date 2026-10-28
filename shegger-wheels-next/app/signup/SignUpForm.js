// app/signup/SignUpForm.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function SignUpForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const requestedNext = searchParams.get("next");
    const next =
        requestedNext?.startsWith("/") && !requestedNext.startsWith("//")
            ? requestedNext
            : "/bookings";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignUp(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password.length < 8) {
            setError("Your password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Your passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: name },
                    emailRedirectTo: `${window.location.origin}/signin`,
                },
            });

            if (error) throw error;

            if (data.session) {
                router.replace(next);
                return;
            }

            setSuccess(
                "Your account was created. Check your email to confirm your account, then sign in."
            );
        } catch (err) {
            setError(err.message || "Could not create your account.");
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleSignUp() {
        setError("");
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}${next}`,
                },
            });

            if (error) throw error;
        } catch (err) {
            setError(err.message || "Google sign-in failed.");
            setLoading(false);
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <Link href="/" className="auth-brand">
                    Sheggar Wheels
                </Link>

                <h1>Create your account</h1>
                <p>Join us to book your next ride.</p>

                {error && <p className="auth-error">{error}</p>}
                {success && <p className="auth-success">{success}</p>}

                <button
                    type="button"
                    className="google-button"
                    onClick={handleGoogleSignUp}
                    disabled={loading}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            fill="#4285F4"
                            d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z"
                        />
                        <path
                            fill="#34A853"
                            d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M12.6 27.7a12 12 0 0 1 0-7.4v-5.2H5.8a20 20 0 0 0 0 17.8l6.8-5.2Z"
                        />
                        <path
                            fill="#EA4335"
                            d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6.1 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.2c1.6-4.8 6.1-8.2 11.4-8.2Z"
                        />
                    </svg>
                    <span>Continue with Google</span>
                </button>

                <div className="auth-divider">or create an account with email</div>

                <form className="auth-form" onSubmit={handleSignUp}>
                    <label htmlFor="signup-name">Full name</label>
                    <input
                        id="signup-name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="signup-email">Email address</label>
                    <input
                        id="signup-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="signup-password">Password</label>
                    <input
                        id="signup-password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                        required
                    />

                    <label htmlFor="signup-confirm-password">Confirm password</label>
                    <input
                        id="signup-confirm-password"
                        type="password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        minLength={6}
                        required
                    />

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading ? "Please wait..." : "Create Account"}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link href={`/signin?next=${encodeURIComponent(next)}`}>
                        Sign in
                    </Link>
                </p>
            </section>
        </main>
    );
}
