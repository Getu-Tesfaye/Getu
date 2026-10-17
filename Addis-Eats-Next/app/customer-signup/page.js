
"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";
import Link from "next/link";

export default function CustomerSignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [pending, setPending] = useState(false);
  const [googlePending, setGooglePending] = useState(false);

  async function handleSignup(event) {
    event.preventDefault();
    setMessage("");
    setPending(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });

      if (error) {
        setMessageType("error");
        setMessage(error.message);
        return;
      }

      if (data.session) {
        window.location.href = "/checkout";
      } else {
        setMessageType("success");
        setMessage(
          "Account created! Please check your email to confirm your account, then sign in."
        );
      }
    } catch {
      setMessageType("error");
      setMessage("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  async function handleGoogleSignup() {
    setMessage("");
    setGooglePending(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent("/checkout")}`,
          queryParams: {
            prompt: "select_account",
          },
        },
      });

      if (error) {
        setMessageType("error");
        setMessage(error.message);
        setGooglePending(false);
      }
    } catch {
      setMessageType("error");
      setMessage("Google sign-up failed. Please try again.");
      setGooglePending(false);
    }
  }

  const busy = pending || googlePending;

  return (
    <main className="page narrow-page auth-page">
      <section className="auth-card">
        <div className="auth-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="8" r="4" />
            <path d="M2.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
            <path d="M19 8v6M16 11h6" />
          </svg>
        </div>

        <div className="auth-heading">
          <p className="auth-eyebrow">WELCOME TO ADDIS EATS</p>
          <h1>Create your account</h1>
          <p>
            Join us and enjoy your favorite Ethiopian dishes.
          </p>
        </div>

        <button
          type="button"
          className="google-button"
          onClick={handleGoogleSignup}
          disabled={busy}
        >
          {googlePending ? (
            <span className="auth-spinner" aria-hidden="true" />
          ) : (
            <svg
              className="google-icon"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
              />
              <path
                fill="#34A853"
                d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
              />
              <path
                fill="#FBBC05"
                d="M12.6 27.7a12 12 0 0 1 0-7.4V15H5.8a20 20 0 0 0 0 17.9l6.8-5.2Z"
              />
              <path
                fill="#EA4335"
                d="M24 11.9c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.9 29.5 4 24 4A20 20 0 0 0 5.8 15l6.8 5.3c1.6-4.8 6.1-8.4 11.4-8.4Z"
              />
            </svg>
          )}
          {googlePending ? "Connecting to Google..." : "Continue with Google"}
        </button>

        <div className="auth-divider">
          <span>OR SIGN UP WITH EMAIL</span>
        </div>

        <form onSubmit={handleSignup} className="auth-form">
          <label htmlFor="signup-name">Full name</label>
          <div className="auth-input-wrap">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
            </svg>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
              required
              disabled={busy}
            />
          </div>

          <label htmlFor="signup-email">Email address</label>
          <div className="auth-input-wrap">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              disabled={busy}
            />
          </div>

          <label htmlFor="signup-password">Password</label>
          <div className="auth-input-wrap">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="10" width="16" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              minLength={8}
              required
              disabled={busy}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              disabled={busy}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                  <path d="M9.9 5.2A11 11 0 0 1 12 5c5 0 8.5 4.5 9.5 7-.4 1-1.3 2.4-2.7 3.7M6.2 6.2C3.9 7.7 2.7 10 2.5 12c.7 1.7 2.3 3.6 4.4 4.9A10.6 10.6 0 0 0 12 19" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          <p className="auth-hint">
            Use at least 8 characters for your password.
          </p>

          {message && (
            <div
              className={`auth-message ${messageType}`}
              role="status"
              aria-live="polite"
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={busy}
          >
            {pending ? "Creating your account..." : "Create Account"}
            {!pending && <span aria-hidden="true">→</span>}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link href="/customer-login">Sign in</Link>
        </p>

        <p className="auth-terms">
          By creating an account, you agree to use Addis Eats responsibly.
        </p>
      </section>
    </main>
  );
}
