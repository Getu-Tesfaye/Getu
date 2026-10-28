
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function OwnerEarningsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [earnings, setEarnings] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    bookings: 0,
    cars: 0,
  });

  useEffect(() => {
    loadEarnings();
  }, []);

  async function loadEarnings() {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        router.replace("/signin");
        return;
      }

      // Find cars assigned to this owner.
      const { data: assignments, error: assignmentError } =
        await supabase
          .from("car_owners")
          .select("car_id")
          .eq("owner_id", user.id);

      if (assignmentError) throw assignmentError;

      const carIds = [
        ...new Set((assignments || []).map((item) => item.car_id)),
      ];

      if (carIds.length === 0) {
        setEarnings([]);
        setSummary({ total: 0, bookings: 0, cars: 0 });
        return;
      }

      // Load the owner's assigned cars and their daily rental prices.
      const { data: cars, error: carsError } = await supabase
        .from("cars")
        .select("id, name, daily_price")
        .in("id", carIds);

      if (carsError) throw carsError;

      // Load bookings for those cars.
      const { data: bookings, error: bookingsError } = await supabase
        .from("bookings")
        .select("id, car_id, customer_name, start_date, end_date, status")
        .in("car_id", carIds)
        .order("created_at", { ascending: false });

      if (bookingsError) throw bookingsError;

      const carMap = new Map(
        (cars || []).map((car) => [car.id, car])
      );

      const confirmedBookings = (bookings || []).filter(
        (booking) => booking.status === "confirmed"
      );

      const rows = confirmedBookings.map((booking) => {
        const car = carMap.get(booking.car_id);

        const start = new Date(`${booking.start_date}T00:00:00Z`);
        const end = new Date(`${booking.end_date}T00:00:00Z`);

        const difference = Math.ceil(
          (end.getTime() - start.getTime()) / 86400000
        );

        const days = Math.max(1, difference);
        const dailyPrice = Number(car?.daily_price) || 0;

        return {
          ...booking,
          carName: car?.name || `Car #${booking.car_id}`,
          days,
          dailyPrice,
          estimatedValue: days * dailyPrice,
        };
      });

      const total = rows.reduce(
        (sum, booking) => sum + booking.estimatedValue,
        0
      );

      setEarnings(rows);
      setSummary({
        total,
        bookings: rows.length,
        cars: (cars || []).length,
      });
    } catch (err) {
      console.error("Owner earnings error:", err);
      setError(
        err.message ||
          "Could not load earnings. Check your Supabase tables and permissions."
      );
    } finally {
      setLoading(false);
    }
  }

  function formatETB(amount) {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 2,
    }).format(amount);
  }

  function formatDate(date) {
    if (!date) return "—";

    return new Date(`${date}T00:00:00`).toLocaleDateString();
  }

  if (loading) {
    return (
      <main className="owner-earnings-page">
        <p className="owner-earnings-message">
          Loading your earnings...
        </p>
      </main>
    );
  }

  return (
    <main className="owner-earnings-page">
      <div className="owner-earnings-header">
        <div>
          <p className="owner-earnings-eyebrow">OWNER PORTAL</p>
          <h1>My Earnings</h1>
          <p>
            Review the estimated rental value of your confirmed bookings.
          </p>
        </div>

        <button
          className="owner-earnings-button"
          onClick={loadEarnings}
          type="button"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="owner-earnings-error">
          {error}
        </div>
      )}

      <section className="owner-earnings-stats">
        <article className="owner-earnings-stat">
          <span>Estimated booking value</span>
          <strong>{formatETB(summary.total)}</strong>
          <small>Confirmed bookings only</small>
        </article>

        <article className="owner-earnings-stat">
          <span>Confirmed bookings</span>
          <strong>{summary.bookings}</strong>
          <small>Bookings included in the estimate</small>
        </article>

        <article className="owner-earnings-stat">
          <span>Assigned cars</span>
          <strong>{summary.cars}</strong>
          <small>Cars linked to your account</small>
        </article>
      </section>

      <section className="owner-earnings-table-section">
        <div className="owner-earnings-section-heading">
          <h2>Confirmed booking details</h2>
          <span>{earnings.length} bookings</span>
        </div>

        {earnings.length === 0 ? (
          <div className="owner-earnings-empty">
            <h3>No confirmed bookings yet</h3>
            <p>
              Estimated booking values will appear here when your cars
              have confirmed bookings.
            </p>
          </div>
        ) : (
          <div className="owner-earnings-table-wrap">
            <table className="owner-earnings-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Car</th>
                  <th>Rental dates</th>
                  <th>Days</th>
                  <th>Daily price</th>
                  <th>Estimated value</th>
                </tr>
              </thead>

              <tbody>
                {earnings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.customer_name || "Customer"}</td>
                    <td>{booking.carName}</td>
                    <td>
                      {formatDate(booking.start_date)}
                      {" – "}
                      {formatDate(booking.end_date)}
                    </td>
                    <td>{booking.days}</td>
                    <td>{formatETB(booking.dailyPrice)}</td>
                    <td className="owner-earnings-amount">
                      {formatETB(booking.estimatedValue)}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan={5}>Total estimated booking value</td>
                  <td className="owner-earnings-amount">
                    {formatETB(summary.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        <p className="owner-earnings-disclaimer">
          These figures are estimates calculated from the daily rental
          price and booking dates. They are not proof of payment and do
          not account for commissions, refunds, or other deductions.
        </p>
      </section>

      <button
        className="owner-earnings-back"
        type="button"
        onClick={() => router.push("/owner-dashboard")}
      >
        Back to Owner Dashboard
      </button>
    </main>
  );
}
