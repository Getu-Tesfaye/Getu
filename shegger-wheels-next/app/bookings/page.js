import { Suspense } from "react";
import BookingForm from "./BookingForm";

export default function BookingsPage() {
  return (
    <Suspense 
      fallback={
        <main className="booking-page">
          <p>Checking your sign-in...</p>
        </main>
      }
    >
      <BookingForm />
    </Suspense>
  );
}
