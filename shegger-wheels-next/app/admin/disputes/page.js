
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminDisputesPage() {
    const router = useRouter();

    const [disputes, setDisputes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [savingId, setSavingId] = useState("");
    const [filter, setFilter] = useState("all");
    const [decisions, setDecisions] = useState({});
    const [clearedDecisionIds, setClearedDecisionIds] = useState({});

    async function loadDisputes() {
        setLoading(true);
        setError("");

        try {
            const { data, error: sessionError } =
                await supabase.auth.getSession();

            if (sessionError) throw sessionError;

            const token = data.session?.access_token;

            if (!token) {
                router.push("/admin/login");
                return;
            }

            const response = await fetch("/api/admin/disputes", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-store",
            });

            const result = await response.json();

            if (response.status === 401) {
                router.push("/admin/login");
                return;
            }

            if (!response.ok) {
                throw new Error(
                    result.error || "Could not load disputes."
                );
            }

            setDisputes(result.disputes || []);
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDisputes();
    }, []);

    async function updateDispute(dispute) {
       const decision = decisions[dispute.id] ?? "";

        if (
            dispute.status !== "resolved" &&
            !decision.trim()
        ) {
            alert("Please enter the administrator's decision first.");
            return;
        }

        setSavingId(dispute.id);
        setError("");

        try {
            const { data, error: sessionError } =
                await supabase.auth.getSession();

            if (sessionError) throw sessionError;

            const token = data.session?.access_token;

            if (!token) {
                router.push("/admin/login");
                return;
            }

            const response = await fetch("/api/admin/disputes", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: dispute.id,
                    status: dispute.status,
                    admin_decision: decision,
                }),
            });

            const result = await response.json();

            if (response.status === 401) {
                router.push("/admin/login");
                return;
            }

            if (!response.ok) {
                throw new Error(
                    result.error || "Could not update the dispute."
                );
            }

            setDisputes((current) =>
                current.map((item) =>
                    item.id === dispute.id
                        ? { ...result.dispute, admin_decision: "" }
                        : item
                )
            );
            setDecisions((current) => {
                const updated = { ...current };
                delete updated[dispute.id];
                return updated;
            });
            setDecisions((current) => ({
                ...current,
                [dispute.id]: "",
            }));

            setClearedDecisionIds((current) => ({
                ...current,
                [dispute.id]: true,
            }));

            alert("Dispute updated successfully.");

        } catch (err) {
            setError(err.message || "Could not update the dispute.");
        } finally {
            setSavingId("");
        }
    }

    const filteredDisputes =
        filter === "all"
            ? disputes
            : disputes.filter((dispute) => dispute.status === filter);

    const pendingCount = disputes.filter(
        (dispute) => dispute.status === "open"
    ).length;

    const reviewingCount = disputes.filter(
        (dispute) => dispute.status === "under_review"
    ).length;

    const resolvedCount = disputes.filter(
        (dispute) => dispute.status === "resolved"
    ).length;

    function formatDate(date) {
        if (!date) return "Not available";

        return new Date(date).toLocaleString();
    }

    function formatStatus(status) {
        if (status === "under_review") return "Under Review";

        return status
            ? status.charAt(0).toUpperCase() + status.slice(1)
            : "Open";
    }

    return (
        <main className="admin-page">
            <header className="admin-header">
                <div>
                    <p className="admin-eyebrow">SHEGGAR WHEELS</p>
                    <h1>Dispute Management</h1>
                    <p className="admin-subtitle">
                        Review and manage problems reported by customers
                        and car owners.
                    </p>
                </div>

                <Link href="/admin" className="admin-button">
                    Back to Admin
                </Link>
            </header>

            <section className="admin-disputes-panel">
                <div className="admin-disputes-icon">!</div>

                <h2>Dispute Overview</h2>

                <p>
                    Review reported problems, update their status, and
                    record administrator decisions.
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(150px, 1fr))",
                        gap: "14px",
                        margin: "24px 0",
                    }}
                >
                    <div>
                        <h3>Total Disputes</h3>
                        <p>{disputes.length}</p>
                    </div>

                    <div>
                        <h3>Open</h3>
                        <p>{pendingCount}</p>
                    </div>

                    <div>
                        <h3>Under Review</h3>
                        <p>{reviewingCount}</p>
                    </div>

                    <div>
                        <h3>Resolved</h3>
                        <p>{resolvedCount}</p>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        flexWrap: "wrap",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <label htmlFor="dispute-filter">
                        Filter disputes:
                    </label>

                    <select
                        id="dispute-filter"
                        value={filter}
                        onChange={(event) => setFilter(event.target.value)}
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                        }}
                    >
                        <option value="all">All disputes</option>
                        <option value="open">Open</option>
                        <option value="under_review">Under Review</option>
                        <option value="resolved">Resolved</option>
                    </select>

                    <button
                        type="button"
                        className="admin-button"
                        onClick={loadDisputes}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Refresh"}
                    </button>
                </div>

                {loading && <p>Loading disputes...</p>}

                {!loading && error && (
                    <div role="alert">
                        <p>{error}</p>
                        <button
                            type="button"
                            className="admin-button"
                            onClick={loadDisputes}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && filteredDisputes.length === 0 && (
                    <p>
                        {disputes.length === 0
                            ? "No disputes have been submitted yet."
                            : "No disputes match this filter."}
                    </p>
                )}

                {!loading && !error && filteredDisputes.length > 0 && (
                    <div style={{ display: "grid", gap: "18px" }}>
                        {filteredDisputes.map((dispute) => (
                            <article
                                key={dispute.id}
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "12px",
                                    padding: "18px",
                                    overflowWrap: "anywhere",
                                }}
                            >
                                <h3>
                                    {dispute.title || "Reported dispute"}
                                </h3>

                                <p>
                                    <strong>Status: </strong>
                                    {formatStatus(dispute.status)}
                                </p>

                                <p>
                                    <strong>Booking ID: </strong>
                                    {dispute.booking_id || "Not linked"}
                                </p>

                                <p>
                                    <strong>Reported by: </strong>
                                    {dispute.reported_by || "Not available"}
                                </p>

                                <p>
                                    <strong>Description</strong>
                                </p>

                                <p style={{ whiteSpace: "pre-wrap" }}>
                                    {dispute.description}
                                </p>

                                <p>
                                    <strong>Submitted: </strong>
                                    {formatDate(dispute.created_at)}
                                </p>

                                <div
                                    style={{
                                        display: "grid",
                                        gap: "8px",
                                        marginTop: "16px",
                                    }}
                                >
                                    <label htmlFor={`status-${dispute.id}`}>
                                        Update status
                                    </label>

                                    <select
                                        id={`status-${dispute.id}`}
                                        value={dispute.status || "open"}
                                        onChange={(event) =>
                                            setDisputes((current) =>
                                                current.map((item) =>
                                                    item.id === dispute.id
                                                        ? {
                                                            ...item,
                                                            status: event.target.value,
                                                        }
                                                        : item
                                                )
                                            )
                                        }
                                        style={{
                                            padding: "10px",
                                            borderRadius: "8px",
                                            border: "1px solid #ccc",
                                        }}
                                    >
                                        <option value="open">Open</option>
                                        <option value="under_review">
                                            Under Review
                                        </option>
                                        <option value="resolved">Resolved</option>
                                    </select>

                                    <label htmlFor={`decision-${dispute.id}`}>
                                        Administrator decision
                                    </label>

                                    <textarea
                                        id={`decision-${dispute.id}`}
                                        value={
                                            decisions[dispute.id] ??
                                            (clearedDecisionIds[dispute.id]
                                                ? ""
                                                : dispute.admin_decision ?? "")
                                        }
                                        onChange={(event) => {
                                            setDecisions((current) => ({
                                                ...current,
                                                [dispute.id]: event.target.value,
                                            }));

                                            setClearedDecisionIds((current) => ({
                                                ...current,
                                                [dispute.id]: false,
                                            }));
                                        }}
                                        rows={3}
                                        maxLength={5000}
                                        placeholder="Write the investigation result or decision..."
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            borderRadius: "8px",
                                            border: "1px solid #ccc",
                                            boxSizing: "border-box",
                                        }}
                                    />

                                    <button
                                        type="button"
                                        className="admin-button"
                                        onClick={() =>
                                            updateDispute(dispute)
                                        }
                                        disabled={savingId === dispute.id}
                                    >
                                        {savingId === dispute.id
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <p className="admin-disputes-note">
                    Only authorized administrators can retrieve and update
                    disputes through the protected server API.
                </p>
            </section>
        </main>
    );
}
