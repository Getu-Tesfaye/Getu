
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function AdminReportsPage() {
    const [cars, setCars] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadReports() {
        setLoading(true);
        setError("");

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            setError("Please sign in to view reports.");
            setCars([]);
            setBookings([]);
            setLoading(false);
            return;
        }

        const [carsResult, bookingsResult] = await Promise.all([
            supabase
                .from("cars")
                .select("id, name, category, approval_status, is_available"),

            supabase
                .from("bookings")
                .select("id, car_id, status, start_date, end_date, created_at"),
        ]);

        if (carsResult.error || bookingsResult.error) {
            setError(
                "Some report data could not be loaded. Check your Supabase permissions. " +
                    [
                        carsResult.error?.message,
                        bookingsResult.error?.message,
                    ]
                        .filter(Boolean)
                        .join(" ")
            );
        }

        setCars(carsResult.data || []);
        setBookings(bookingsResult.data || []);
        setLoading(false);
    }

    useEffect(() => {
        loadReports();
    }, []);

    const countBy = (items, field, value) =>
        items.filter((item) => item[field] === value).length;

    const confirmedBookings = countBy(bookings, "status", "confirmed");
    const pendingBookings = countBy(bookings, "status", "pending");
    const cancelledBookings = countBy(bookings, "status", "cancelled");

    const approvedCars = countBy(cars, "approval_status", "approved");
    const pendingCars = countBy(cars, "approval_status", "pending");
    const rejectedCars = countBy(cars, "approval_status", "rejected");

    const reportRows = [
        { label: "Cars visible to this account", value: cars.length },
        { label: "Approved cars", value: approvedCars },
        { label: "Pending car approvals", value: pendingCars },
        { label: "Rejected cars", value: rejectedCars },
        { label: "Bookings visible to this account", value: bookings.length },
        { label: "Pending bookings", value: pendingBookings },
        { label: "Confirmed bookings", value: confirmedBookings },
        { label: "Cancelled bookings", value: cancelledBookings },
    ];

    return (
        <main className="admin-page">
            <header className="admin-header">
                <div>
                    <p className="admin-eyebrow">SHEGGAR WHEELS</p>
                    <h1>Reports</h1>
                    <p className="admin-subtitle">
                        A summary of car listings and bookings available to
                        your current account.
                    </p>
                </div>

                <Link href="/admin" className="admin-button">
                    Back to Admin
                </Link>
            </header>

            <div className="admin-reports-actions">
                <button
                    type="button"
                    className="admin-button"
                    onClick={loadReports}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Refresh Reports"}
                </button>
            </div>

            {error && (
                <p className="admin-reports-message" role="alert">
                    {error}
                </p>
            )}

            {loading ? (
                <p className="admin-reports-message">Loading report data...</p>
            ) : (
                <>
                    <section className="admin-reports-grid">
                        <article className="admin-reports-card">
                            <span>Cars</span>
                            <strong>{cars.length}</strong>
                            <small>Visible to your account</small>
                        </article>

                        <article className="admin-reports-card">
                            <span>Bookings</span>
                            <strong>{bookings.length}</strong>
                            <small>Visible to your account</small>
                        </article>

                        <article className="admin-reports-card">
                            <span>Confirmed</span>
                            <strong>{confirmedBookings}</strong>
                            <small>Confirmed bookings</small>
                        </article>

                        <article className="admin-reports-card">
                            <span>Awaiting review</span>
                            <strong>{pendingBookings + pendingCars}</strong>
                            <small>Pending bookings and car approvals</small>
                        </article>
                    </section>

                    <section className="admin-reports-section">
                        <h2>Report summary</h2>

                        <div className="admin-reports-table-wrap">
                            <table className="admin-reports-table">
                                <thead>
                                    <tr>
                                        <th>Metric</th>
                                        <th>Count</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {reportRows.map((row) => (
                                        <tr key={row.label}>
                                            <td>{row.label}</td>
                                            <td>{row.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <p className="admin-reports-note">
                        These are counts of records visible to your account,
                        not necessarily totals for the entire platform. This
                        report does not calculate revenue or actual payments.
                    </p>
                </>
            )}
        </main>
    );
}
