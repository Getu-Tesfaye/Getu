
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

 function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const signIn = () => setIsAuthenticated(true);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
export default AuthProvider;