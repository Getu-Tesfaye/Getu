"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CustomerLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [pending, setPending] = useState(false);
    const searchParams = useSearchParams();

    const messageFromPage = searchParams.get("message");
    const next = searchParams.get("next") || "/checkout";

    const safeNext =
        next.startsWith("/") && !next.startsWith("//")
            ? next
            : "/checkout";

    async function handleLogin(event) {
        event.preventDefault();
        setMessage("");
        setPending(true);

        try {
            const supabase = createClient();

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setMessage(error.message);
                return;
            }

            window.location.href = safeNext;
        } catch {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setPending(false);
        }
    }

    async function handleGoogleLogin() {
        setMessage("");
        setPending(true);

        try {
            const supabase = createClient();

            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext)}`,
                },
            });

            if (error) {
                setMessage(error.message);
                setPending(false);
            }
        } catch {
            setMessage("Google sign-in failed. Please try again.");
            setPending(false);
        }
    }

    return (
        <div className="page narrow-page">
            <div className="page-heading">
                <h1>Customer Login</h1>
                <p>Sign in to place an order and view your orders.</p>
            </div>

            <form onSubmit={handleLogin} className="checkout-form">
                <label>
                    Email Address
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                    />
                </label>

                {message && <p className="form-error">{message}</p>}
                {messageFromPage && <p>{messageFromPage}</p>}

                <button
                    type="submit"
                    className="button"
                    disabled={pending}
                >
                    {pending ? "Signing in..." : "Sign In"}
                </button>

                <div style={{ textAlign: "center", margin: "16px 0" }}>
                    <span>OR</span>
                </div>

                <button
                    type="button"
                    className="button"
                    onClick={handleGoogleLogin}
                    disabled={pending}
                >
                    {pending ? "Please wait..." : "Continue with Google"}
                </button>

                <p>
                    Don't have an account?{" "}
                    <Link href="/customer-signup">Create an account</Link>
                </p>
            </form>
        </div>
    );
}