import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ name: 'Getu' });

  function login(userData) {
    setUser(userData);
  }

  function logout() {
    setUser(null);
  }

  return React.createElement(
    AuthContext.Provider,
    { value: { user, login, logout } },
    children
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}