// app/signup/page.js
import { Suspense } from "react";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <Suspense 
      fallback={
        <main className="auth-page">
          <section className="auth-card">
            <p>Loading sign up options...</p>
          </section>
        </main>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
