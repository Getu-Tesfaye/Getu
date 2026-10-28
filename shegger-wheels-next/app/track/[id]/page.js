
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { when } from "@/lib/format";

const DeliveryMap = dynamic(
    () => import("./DeliveryMap"),
    {
        ssr: false,
        loading: () => (
            <div
                style={{
                    height: 380,
                    display: "grid",
                    placeItems: "center",
                    background: "#f3f4f6",
                    borderRadius: 12,
                }}
            >
                Loading map...
            </div>
        ),
    }
);

export default function TrackPage() {
    const params = useParams();
    const orderId = params.id;
    const [status, setStatus] = useState("Connecting...");
    const [connection, setConnection] = useState("Connecting");
    const [streamError, setStreamError] = useState("");


    useEffect(() => {
        if (!orderId) return;

        const source = new EventSource(
            `/api/orders/${encodeURIComponent(orderId)}/stream`
        );

        source.addEventListener("open", () => {
            setConnection("Connected");
            setStreamError("");
        });

        source.addEventListener("connection", () => {
            setConnection("Connected");
        });

        source.addEventListener("status", (event) => {
            const data = JSON.parse(event.data);
            setStatus(data.status);
        });

        source.addEventListener("stream-error", (event) => {
            const data = JSON.parse(event.data);
            setStreamError(data.message);
            setConnection("Disconnected");
            source.close();
        });

        source.addEventListener("delivered", (event) => {
            const data = JSON.parse(event.data);
            setStatus(data.status);
            setConnection("Completed");
            source.close();
        });

        source.onerror = () => {
            setConnection("Reconnecting...");
        };

        return () => {
            source.close();
        };
    }, [orderId]);


    // Sample Addis Ababa coordinates for testing.
    const courier = [9.03, 38.74];
    const delivery = [9.02, 38.75];
    const deliveryAddress = "Addis Ababa, Ethiopia";

    return (
        <main className="admin-page">
            <header className="admin-header">
                <div>
                    <p className="admin-eyebrow">SHEGGAR WHEELS</p>
                    <h1>Delivery Tracking</h1>
                    <p className="admin-subtitle">
                        Tracking reference: {orderId}
                    </p>
                </div>
            </header>

            <section className="admin-disputes-panel">

                <section
                    style={{
                        marginBottom: 20,
                        padding: 16,
                        background: "#f3f4f6",
                        borderRadius: 12,
                    }}
                >
                    <h2>Live Booking Status</h2>

                    <p>
                        <strong>Status:</strong> {status}
                    </p>

                    <p>
                        <strong>Connection:</strong> {connection}
                    </p>

                    {streamError && (
                        <p style={{ color: "#dc2626" }}>
                            {streamError}
                        </p>
                    )}
                </section>

                <h2>Map</h2>

                <DeliveryMap
                    courier={courier}
                    delivery={delivery}
                    deliveryAddress={deliveryAddress}
                />

                <h2 style={{ marginTop: 24 }}>Location Details</h2>

                <p><strong>Courier:</strong> Sample location</p>
                <p><strong>Courier latitude:</strong> {courier[0]}</p>
                <p><strong>Courier longitude:</strong> {courier[1]}</p>

                <p><strong>Delivery address:</strong> {deliveryAddress}</p>
                <p><strong>Delivery latitude:</strong> {delivery[0]}</p>
                <p><strong>Delivery longitude:</strong> {delivery[1]}</p>

                <p><strong>Page opened:</strong> {when(new Date())}</p>
            </section>
        </main>
    );
}
