/**
 * Addis Eats — Admin Login
 */

const ADMIN_CREDENTIALS = {
  username: 'getu',
  password: 'getu4321',
};

const SESSION_KEY = 'adminLoggedIn';

function showError(message) {
  const el = document.getElementById('login-error');
  el.textContent = message;
  el.hidden = false;
}

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    window.location.href = 'admin-dashboard.html';
  } else {
    showError('Invalid username or password. Try admin / admin123');
  }
});

if (sessionStorage.getItem(SESSION_KEY) === 'true') {
  window.location.href = 'admin-dashboard.html';
}
