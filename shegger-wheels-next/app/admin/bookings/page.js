
"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [cars, setCars] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadBookings() {
        setLoading(true);
        setError("");

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            setError("Please sign in to view bookings.");
            setBookings([]);
            setLoading(false);
            return;
        }

        const { data: bookingData, error: bookingError } =
            await supabase
                .from("bookings")
                .select(
                    "id, user_id, customer_name, car_id, start_date, end_date, status, created_at"
                )
                .order("created_at", { ascending: false });

        if (bookingError) {
            setError(
                "Could not load bookings. Check your Supabase permissions: " +
                bookingError.message
            );
            setBookings([]);
            setLoading(false);
            return;
        }

        const { data: carData, error: carError } = await supabase
            .from("cars")
            .select("id, name, daily_price");

        setBookings(bookingData || []);
        setCars(carError ? [] : carData || []);

        if (carError) {
            setError(
                "Bookings loaded, but car names could not be loaded. Check car-table permissions."
            );
        }

        setLoading(false);
    }

    useEffect(() => {
        loadBookings();
    }, []);

    const filteredBookings =
        filter === "all"
            ? bookings
            : bookings.filter((booking) => booking.status === filter);

    function getCar(carId) {
        return cars.find((car) => car.id === carId);
    }

    function formatDate(date) {
        if (!date) return "—";

        return new Date(`${date}T00:00:00`).toLocaleDateString();
    }

    function statusClass(status) {
        if (status === "confirmed") return "admin-booking-status confirmed";
        if (status === "cancelled") return "admin-booking-status cancelled";

        return "admin-booking-status pending";
    }

    return (
        <main className="admin-page">
            <header className="admin-header">
                <div>
                    <p className="admin-eyebrow">SHEGGAR WHEELS</p>
                    <h1>Manage Bookings</h1>
                    <p className="admin-subtitle">
                        Review customer reservations and their current status.
                    </p>
                </div>

                <Link href="/admin" className="admin-button">
                    Back to Admin
                </Link>
            </header>

            <section className="admin-bookings-toolbar">
                <div>
                    <label htmlFor="booking-filter">
                        Filter bookings
                    </label>

                    <select
                        id="booking-filter"
                        value={filter}
                        onChange={(event) => setFilter(event.target.value)}
                    >
                        <option value="all">All bookings</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <button
                    type="button"
                    className="admin-button"
                    onClick={loadBookings}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Refresh"}
                </button>
            </section>

            <section className="admin-bookings-summary">
                <div className="admin-bookings-stat">
                    <span>Total bookings loaded</span>
                    <strong>{bookings.length}</strong>
                </div>

                <div className="admin-bookings-stat">
                    <span>Pending</span>
                    <strong>
                        {bookings.filter((b) => b.status === "pending").length}
                    </strong>
                </div>

                <div className="admin-bookings-stat">
                    <span>Confirmed</span>
                    <strong>
                        {bookings.filter((b) => b.status === "confirmed").length}
                    </strong>
                </div>
            </section>

            {error && (
                <p className="admin-bookings-message" role="alert">
                    {error}
                </p>
            )}

            {loading ? (
                <p className="admin-bookings-message">Loading bookings...</p>
            ) : filteredBookings.length === 0 ? (
                <div className="admin-bookings-empty">
                    <h2>No bookings found</h2>
                    <p>
                        There are no bookings matching this filter.
            
                    </p>
                </div>
            ) : (
                <div className="admin-bookings-table-wrap">
                    <table className="admin-bookings-table">
                        <thead>
                            <tr>
                                <th>Booking</th>
                                <th>Customer</th>
                                <th>Car</th>
                                <th>Start date</th>
                                <th>End date</th>
                                <th>Status</th>
                                <th>Created</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredBookings.map((booking) => {
                                const car = getCar(booking.car_id);

                                return (
                                    <tr key={booking.id}>
                                        <td>
                                            <span className="admin-booking-id">
                                                #{String(booking.id).slice(0, 8)}
                                            </span>
                                        </td>

                                        <td>
                                            <strong>
                                                {booking.customer_name || "—"}
                                            </strong>
                                        </td>

                                        <td>
                                            {car?.name || `Car #${booking.car_id}`}
                                            {car?.daily_price != null && (
                                                <small className="admin-booking-price">
                                                    ETB{" "}
                                                    {Number(
                                                        car.daily_price
                                                    ).toLocaleString()}{" "}
                                                    / day
                                                </small>
                                            )}
                                        </td>

                                        <td>{formatDate(booking.start_date)}</td>
                                        <td>{formatDate(booking.end_date)}</td>

                                        <td>
                                            <span
                                                className={statusClass(
                                                    booking.status
                                                )}
                                            >
                                                {booking.status || "unknown"}
                                            </span>
                                        </td>

                                        <td>
                                            {booking.created_at
                                                ? new Date(
                                                    booking.created_at
                                                ).toLocaleDateString()
                                                : "—"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}
