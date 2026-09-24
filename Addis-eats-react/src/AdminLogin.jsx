
import {useState} from "react";
import { useNavigate} from "react-router-dom";

function AdminLogin() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    

    const handleLogin = (event) => {
        event.preventDefault();

        if (username === "getu" && password === "getu@432") {
            sessionStorage.setItem("adminLoggedIn", "true");
            navigate("/admin");
        } else {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="admin-login-page">

            <form onSubmit={handleLogin}>
                <input type="text" placeholder="username" value={username} 
                onChange={(event) => setUsername(event.target.value)}/>
                <br />

                <input type="password" placeholder="password" value={password}
                onChange={(event) => setPassword(event.target.value)}/>
                <br />

                <button type="submit">Login</button>
                
                

         </form>
        </div>
    );
}
export default AdminLogin;