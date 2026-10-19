import { useAuth } from '../auth/useAuth';
import { CartBadge } from '../CartBadge';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <h1>Addis Eats</h1>
      <div className="header-right">
        {user && (
          <div>
            <span className="user-name">Welcome, {user.name}</span>
            <button className="btn-logout" onClick={logout}>
              Logout
            </button>
          </div>
        )}
        <CartBadge />
      </div>
    </header>
  );
}