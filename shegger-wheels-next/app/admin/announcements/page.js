
"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminAnnouncementsPage() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [audience, setAudience] = useState("everyone");
    const [preview, setPreview] = useState(false);
    const [notice, setNotice] = useState("");

    function handlePreview() {
        setNotice("");

        if (!title.trim() || !message.trim()) {
            setNotice("Please enter both a title and a message.");
            setPreview(false);
            return;
        }

        setPreview(true);
    }

    function clearForm() {
        setTitle("");
        setMessage("");
        setAudience("everyone");
        setPreview(false);
        setNotice("");
    }

    return (
        <main className="admin-page">
            <header className="admin-header">
                <div>
                    <p className="admin-eyebrow">SHEGGAR WHEELS</p>
                    <h1>Announcements</h1>
                    <p className="admin-subtitle">
                        Prepare important updates for customers and car owners.
                    </p>
                </div>

                <Link href="/admin" className="admin-button">
                    Back to Admin
                </Link>
            </header>

            <section className="admin-announcements-layout">
                <div className="admin-announcements-form">
                    <h2>Create an announcement</h2>

                    <p className="admin-announcements-help">
                        Write your announcement below. You can preview it
                        before saving it to a database in a future step.
                    </p>

                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            handlePreview();
                        }}
                    >
                        <label htmlFor="announcement-title">
                            Announcement title
                        </label>

                        <input
                            id="announcement-title"
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="For example: Scheduled maintenance"
                            maxLength={120}
                            required
                        />

                        <label htmlFor="announcement-audience">
                            Audience
                        </label>

                        <select
                            id="announcement-audience"
                            value={audience}
                            onChange={(event) =>
                                setAudience(event.target.value)
                            }
                        >
                            <option value="everyone">Everyone</option>
                            <option value="customers">Customers</option>
                            <option value="owners">Car owners</option>
                        </select>

                        <label htmlFor="announcement-message">
                            Message
                        </label>

                        <textarea
                            id="announcement-message"
                            value={message}
                            onChange={(event) =>
                                setMessage(event.target.value)
                            }
                            placeholder="Write the announcement here..."
                            rows={7}
                            maxLength={2000}
                            required
                        />

                        <p className="admin-announcements-counter">
                            {message.length} / 2000 characters
                        </p>

                        {notice && (
                            <p
                                className="admin-announcements-notice"
                                role="alert"
                            >
                                {notice}
                            </p>
                        )}

                        <div className="admin-announcements-actions">
                            <button
                                type="submit"
                                className="admin-button"
                            >
                                Preview announcement
                            </button>

                            <button
                                type="button"
                                className="admin-announcements-clear"
                                onClick={clearForm}
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>

                <aside className="admin-announcements-preview">
                    <p className="admin-eyebrow">PREVIEW</p>
                    <h2>{title.trim() || "Your announcement title"}</h2>

                    <span className="admin-announcements-audience">
                        Audience: {audience}
                    </span>

                    <p className="admin-announcements-preview-message">
                        {message.trim() ||
                            "Your announcement message will appear here."}
                    </p>

                    {preview && (
                        <p className="admin-announcements-preview-success">
                            Preview ready. Nothing has been published or saved.
                        </p>
                    )}
                </aside>
            </section>

            <p className="admin-announcements-footnote">
                This page currently creates a local preview only. It does not
                publish announcements or send notifications.
            </p>
        </main>
    );
}
