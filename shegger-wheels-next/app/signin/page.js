import { Suspense } from "react";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <Suspense 
      fallback={
        <main className="auth-page">
          <section className="auth-card">
            <p>Loading sign in options...</p>
          </section>
        </main>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
