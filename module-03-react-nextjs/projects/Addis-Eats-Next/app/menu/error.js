"use client";

export default function Error({ reset }) {
  return (
    <div className="error-page">
      <h2>Could not load the menu.</h2>

      <button onClick={() => reset()} className="button">
        Try Again
      </button>
    </div>
  );
}