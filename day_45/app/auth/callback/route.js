import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

export async function GET(request) {
    const { searchParams, origin } = new URL(request.url);

    const code = searchParams.get("code");
    const next = searchParams.get("next") || "/checkout";

    const safeNext =
        next.startsWith("/") && !next.startsWith("//")
            ? next
            : "/checkout";

    if (code) {
        const supabase = await createClient();

        const { error } =
            await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return NextResponse.redirect(`${origin}${safeNext}`);
        }
    }

    return NextResponse.redirect(
        `${origin}/customer-login?message=Google%20sign-in%20failed.%20Please%20try%20again.`
    );
}