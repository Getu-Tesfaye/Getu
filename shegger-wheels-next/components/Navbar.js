
"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, UserPlus, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button
            className="hamburger-button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            aria-expanded={sidebarOpen}
          >
            ☰
          </button>

          <Link href="/" className="logo">
            <span className="logo-icon">S</span>
            <span className="logo-text">
              Sheggar <span className="logo-accent">Wheels</span>
            </span>
          </Link>
        </div>

        <div className="navbar-right">
          <Link
            href="/signin"
            className="nav-icon-button signin-icon"
            aria-label="Sign In"
            title="Sign In"
          >
            <LogIn size={20} strokeWidth={2} />
          </Link>

          <Link
            href="/signup"
            className="nav-icon-button signup-icon"
            aria-label="Sign Up"
            title="Sign Up"
          >
            <UserPlus size={20} strokeWidth={2} />
          </Link>

          <Link
            href="/admin/login"
            className="nav-icon-button admin-icon"
            aria-label="Admin Login"
            title="Admin Login"
          >
            <ShieldCheck size={20} strokeWidth={2} />
          </Link>
        </div>
      </nav>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
        aria-hidden={!sidebarOpen}
        inert={!sidebarOpen}
      >
        <div className="sidebar-header">
          <Link href="/" className="logo" onClick={closeSidebar}>
            <span className="logo-icon">S</span>
            <span className="logo-text">
              Sheggar <span className="logo-accent">Wheels</span>
            </span>
          </Link>

          <button
            className="sidebar-close"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <div className="sidebar-links">
          <Link href="/" onClick={closeSidebar}>Home</Link>
          <Link href="/cars" onClick={closeSidebar}>Cars</Link>
          <Link href="/bookings" onClick={closeSidebar}>Bookings</Link>
          <Link href="/my-bookings" onClick={closeSidebar}>
            Renter Dashboard
          </Link>
          <Link href="/owner-dashboard" onClick={closeSidebar}>
            Owner Dashboard
          </Link>
        </div>
      </aside>
    </>
  );
}
