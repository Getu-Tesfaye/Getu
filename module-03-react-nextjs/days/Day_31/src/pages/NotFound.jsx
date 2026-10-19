
import { Link } from "react-router-dom";

 function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <Link to="/">Go home</Link>
    </section>
  );
}
export default NotFound;