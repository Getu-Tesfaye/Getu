
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminUsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadUsers() {
    setLoading(true);
    setError("");

    try {
      // Get the current signed-in user's session.
      const { data, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      const token = data.session?.access_token;

      if (!token) {
        router.push("/admin/login");
        return;
      }

      // Ask our secure Next.js API to retrieve registered users.
      const response = await fetch("/api/admin/users", {
        method: "GET",
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
          result.error || "Could not load platform users."
        );
      }

      setUsers(result.users || []);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function updateGetuAccount() {
    const confirmed = window.confirm(
      "Change getutesfaye919@gmail.com to Owner and set the name to Getu Tesfaye?"
    );

    if (!confirmed) return;

    try {
      const { data, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      const token = data.session?.access_token;

      if (!token) {
        router.push("/admin/login");
        return;
      }

      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: "getutesfaye919@gmail.com",
          role: "owner",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Account update failed.");
      }

      alert("Account updated successfully!");
      await loadUsers();
    } catch (err) {
      alert(err.message || "Could not update the account.");
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.role.toLowerCase().includes(searchText)
    );
  });

  function formatDate(date) {
    if (!date) return "Never";

    return new Date(date).toLocaleDateString();
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">ADMINISTRATION</p>
          <h1>User Management</h1>
          <p className="admin-subtitle">
            Manage customer and car-owner accounts.
          </p>
        </div>

        <button
          type="button"
          className="admin-button admin-button-secondary"
          onClick={() => router.push("/admin")}
        >
          Back to Dashboard
        </button>
      </header>

      <section className="admin-users-panel">
        <div className="admin-users-icon">👥</div>

        <h2>Platform Users</h2>

        <p>
          View registered customers, car owners, and administrator
          accounts.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            margin: "24px 0",
          }}
        >
          <div>
            <strong>Total registered users: {users.length}</strong>
            <p style={{ margin: "6px 0 0" }}>
              Showing {filteredUsers.length} matching accounts
            </p>
          </div>

          <button
            type="button"
            className="admin-button"
            onClick={loadUsers}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh Users"}
          </button>
        </div>

        <input
          type="search"
          aria-label="Search users"
          placeholder="Search by name, email, or role..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "15px",
          }}
        />

        {loading && (
          <p>Loading registered users...</p>
        )}

        {!loading && error && (
          <div role="alert" className="admin-users-notice">
            <strong>Unable to load users</strong>
            <p>{error}</p>
            <button
              type="button"
              className="admin-button"
              onClick={loadUsers}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && filteredUsers.length === 0 && (
          <p>
            {users.length === 0
              ? "No registered users were returned."
              : "No users match your search."}
          </p>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                minWidth: "700px",
              }}
            >
              <thead>
                <tr>
                  {[
                    "Name",
                    "Email",
                    "Role",
                    "Email Status",
                    "Last Sign In",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      style={{
                        padding: "14px 10px",
                        borderBottom: "2px solid #ddd",
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td
                      style={{
                        padding: "14px 10px",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {user.name || "Not provided"}
                    </td>

                    <td
                      style={{
                        padding: "14px 10px",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {user.email || "No email"}
                    </td>

                    <td
                      style={{
                        padding: "14px 10px",
                        borderBottom: "1px solid #eee",
                        textTransform: "capitalize",
                      }}
                    >
                      {user.role}
                    </td>

                    <td
                      style={{
                        padding: "14px 10px",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {user.emailConfirmed
                        ? "Verified"
                        : "Not verified"}
                    </td>

                    <td
                      style={{
                        padding: "14px 10px",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {formatDate(user.lastSignInAt)}
                    </td>
                    <td
                      style={{
                        padding: "14px 10px",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {user.email?.toLowerCase() ===
                        "getutesfaye919@gmail.com" &&
                        user.role !== "owner" && (
                          <button
                            type="button"
                            className="admin-button"
                            onClick={updateGetuAccount}
                          >
                            Make Owner
                          </button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="admin-users-checklist">
          <h3>Account management</h3>
          <p>
            User listing, role display, and search are conneccted to api
          </p>
        </div>
      </section>
    </main>
  );
}
