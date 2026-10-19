import {createSession} from "@/lib/session";
import { redirect } from "next/navigation";


async function login(formData) {

    "use server"


    const username = formData.get("username");
    const password = formData.get("password");


    if (username === "getu" && password === "1234") {

        await createSession({
            username: username,
            role: "admin",
        });
        redirect("/admin");
    }
}


export default function LoginPage() {

     return (

        <main>

            <h1>Admin Login</h1>
            <form action={login}>
                <input type="text" placeholder="username" name="username"/>
                <input type="password" name="password" placeholder="password"/>
                <button type="submit">Login</button>
            </form>
        </main>
     );
}