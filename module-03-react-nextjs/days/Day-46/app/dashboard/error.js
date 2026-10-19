"use client";

export default function DashboardError({ reset }) {
  return (
    <div className="page">
      <div className="empty">
        <h2>Could not load the dashboard.</h2>
        <p>Please try again.</p>
        <button onClick={() => reset()}>Try Again</button>
      </div>
    </div>
  );
}