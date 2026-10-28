
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function BookingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get("carId");

  const [cars, setCars] = useState([]);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get today's date in local time.
  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  useEffect(() => {
    let active = true;

    async function checkUser() {
      const { data, error } = await supabase.auth.getUser();

      if (!active) return;

      if (error || !data.user) {
        const requestedPath =
          "/bookings" +
          (carId ? `?carId=${encodeURIComponent(carId)}` : "");

        router.replace(
          `/signin?next=${encodeURIComponent(requestedPath)}`
        );
        return;
      }

      setUser(data.user);
      setCustomerName("");
      setAuthLoading(false);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT" && active) {
        const requestedPath =
          "/bookings" +
          (carId ? `?carId=${encodeURIComponent(carId)}` : "");

        router.replace(
          `/signin?next=${encodeURIComponent(requestedPath)}`
        );
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router, carId]);

  useEffect(() => {
    async function loadCars() {
      try {
        const response = await fetch("/cars.json");

        if (!response.ok) {
          throw new Error("Could not load cars.");
        }

        const data = await response.json();
        setCars(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadCars();
  }, []);

  const selectedCar = cars.find(
    (car) => String(car.id) === String(carId)
  );

  // Read a DAILY rental price, not the car's purchase/listing price.
  const dailyPrice = Number(
    selectedCar?.dailyPrice ??
    selectedCar?.daily_price ??
    selectedCar?.rentalPrice ??
    selectedCar?.pricePerDay ??
    0
  );

  // Calculate the number of rental days.
  const rentalDays =
    startDate && endDate && endDate > startDate
      ? Math.round(
          (Date.parse(`${endDate}T00:00:00Z`) -
            Date.parse(`${startDate}T00:00:00Z`)) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalPrice =
    rentalDays > 0 && Number.isFinite(dailyPrice) && dailyPrice > 0
      ? rentalDays * dailyPrice
      : 0;

  const formatETB = (amount) =>
    `${amount.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })} ETB`;

  async function handleSignOut() {
    setError("");

    const { error } = await supabase.auth.signOut();

    if (error) {
      setError("Could not sign out. Please try again.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!user) {
      router.replace("/signin");
      return;
    }

    if (!selectedCar) {
      setError("Please select a car before booking.");
      return;
    }

    if (!customerName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!startDate || !endDate) {
      setError("Please select your pickup and return dates.");
      return;
    }

    if (startDate < minDate) {
      setError("The pickup date cannot be in the past.");
      return;
    }

    if (endDate <= startDate) {
      setError("The return date must be after the pickup date.");
      return;
    }

    if (!Number.isFinite(dailyPrice) || dailyPrice <= 0) {
      setError(
        "This car's daily rental price is missing. Please contact the administrator."
      );
      return;
    }

    const numericCarId = Number(selectedCar.id);

    if (!Number.isInteger(numericCarId)) {
      setError(
        "This car's ID must be an integer to match your bookings table."
      );
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData.user) {
        router.replace(
          `/signin?next=${encodeURIComponent(
            `/bookings?carId=${encodeURIComponent(carId)}`
          )}`
        );
        return;
      }

      const { error: insertError } = await supabase
        .from("bookings")
        .insert({
          user_id: authData.user.id,
          customer_name: customerName.trim(),
          car_id: numericCarId,
          start_date: startDate,
          end_date: endDate,
          status: "pending",
        });

      if (insertError) throw insertError;

      setMessage(
        `Your booking request was submitted successfully! Estimated total: ${formatETB(totalPrice)}.`
      );

      setStartDate("");
      setEndDate("");
    } catch (err) {
      setError(
        err.message || "Your booking could not be saved."
      );
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return (
      <main className="booking-page">
        <p>Checking your sign-in...</p>
      </main>
    );
  }

  return (
    <main className="booking-page">
      <div className="booking-header">
        <div>
          <h1>Book Your Car</h1>
          <p>Choose your dates and submit your booking request.</p>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="booking-logout-button"
        >
          Sign Out
        </button>
      </div>

      {message && <p className="auth-success">{message}</p>}
      {error && <p className="auth-error">{error}</p>}

      {selectedCar ? (
        <section className="selected-car">
          {selectedCar.image && (
            <img
              src={selectedCar.image}
              alt={selectedCar.name}
              style={{
                width: "100%",
                maxWidth: "420px",
                height: "220px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          )}

          <h2>{selectedCar.name}</h2>
          <p>{selectedCar.category}</p>

          <p>
            Daily rental price:{" "}
            {dailyPrice > 0
              ? formatETB(dailyPrice)
              : "Not set"}
          </p>
        </section>
      ) : (
        <section className="no-selected-car">
          <p>Please select a car first.</p>
          <Link href="/cars" className="select-car-button">
            Select a Car
          </Link>
        </section>
      )}

      <form className="booking-form" onSubmit={handleSubmit}>
        <label htmlFor="customer-name">Full name</label>
        <input
          id="customer-name"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />

        <label htmlFor="start-date">Pickup date</label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          min={minDate}
          onChange={(e) => {
            setStartDate(e.target.value);

            if (endDate && endDate <= e.target.value) {
              setEndDate("");
            }
          }}
          required
        />

        <label htmlFor="end-date">Return date</label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          min={startDate || minDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        {/* Automatic rental price calculation */}
        <section className="rental-price-summary" aria-live="polite">
          <h3>Rental Price Summary</h3>

          <div className="rental-price-row">
            <span>Price per day</span>
            <strong>
              {dailyPrice > 0 ? formatETB(dailyPrice) : "Not set"}
            </strong>
          </div>

          <div className="rental-price-row">
            <span>Rental duration</span>
            <strong>
              {rentalDays > 0
                ? `${rentalDays} ${rentalDays === 1 ? "day" : "days"}`
                : "Choose your dates"}
            </strong>
          </div>

          <div className="rental-total-row">
            <span>Estimated Total</span>
            <strong>
              {totalPrice > 0 ? formatETB(totalPrice) : "—"}
            </strong>
          </div>

          <p className="rental-price-note">
            The total updates automatically when you change your dates.
          </p>
        </section>

        <button
          type="submit"
          disabled={loading || !selectedCar}
        >
          {loading ? "Submitting..." : "Confirm Booking"}
        </button>
      </form>
    </main>
  );
}
