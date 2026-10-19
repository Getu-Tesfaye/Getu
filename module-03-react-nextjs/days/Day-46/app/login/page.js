import AdminLogin from "../../components/AdminLogin";

export default function LoginPage() {
  return (
    <div className="page narrow-page">
      <div className="page-heading">
        <h1>Admin Login</h1>

        <p>Login to access the Addis Eats dashboard.</p>
      </div>

      <AdminLogin />
    </div>
  );
}