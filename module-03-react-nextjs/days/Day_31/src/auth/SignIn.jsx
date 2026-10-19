
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

 function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSignIn = () => {
    signIn();
    navigate(from, { replace: true }); // send them back where they came from
  };

  return (
    <section>
      <h1>Sign In</h1>
      <button onClick={handleSignIn}>Sign In</button>
    </section>
  );
}
export default SignIn;