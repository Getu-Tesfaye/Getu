import  {cookies} from "next/headers";


export  async function createSession(user) {
     const cookieStore = await cookies();


     cookieStore.set("session", JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
     });
}

export  async function getSession() {
    const cookieStore = await cookies();


    const session = cookieStore.get("session");

    if (!session) {
        return null;
    }

    try {
        return JSON.parse(session.value);
    }
    catch {
        return null;
    }
}

export  async function clearSession() {
    const cookieStore = await cookies();

    
    cookieStore.delete("session");
}