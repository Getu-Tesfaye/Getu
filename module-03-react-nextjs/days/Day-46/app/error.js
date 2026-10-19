"use client";

export default function Error({ reset }) {
  return (
    <div className="error-page">
      <h2>Something went wrong.</h2>

      <button onClick={() => reset()} className="button">
        Try Again
      </button>
    </div>
  );
}