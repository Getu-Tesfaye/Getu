
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const anonKey = process.env.NEXT_PUBLIC_SUPABASE_publishable_KEY;
        const secretKey = process.env.SUPABASE_SECRET_KEY;

        if (!supabaseUrl || !anonKey || !secretKey) {
            return NextResponse.json(
                { error: "Server environment variables are missing." },
                { status: 500 }
            );
        }

        // Read the signed-in user's access token.
        const authorization = request.headers.get("authorization");
        const token = authorization?.startsWith("Bearer ")
            ? authorization.slice(7)
            : null;

        if (!token) {
            return NextResponse.json(
                { error: "Please sign in first." },
                { status: 401 }
            );
        }

        // Verify the token with Supabase Auth.
        const authClient = createClient(supabaseUrl, anonKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
            },
        });

        const { data: userData, error: authError } =
            await authClient.auth.getUser(token);

        const user = userData?.user;

        if (authError || !user) {
            return NextResponse.json(
                { error: "Your session is invalid. Please sign in again." },
                { status: 401 }
            );
        }

        // Only users with the server-controlled admin role may continue.
        if (user.app_metadata?.role !== "admin") {
            return NextResponse.json(
                { error: "Administrator access required." },
                { status: 403 }
            );
        }

        // The secret key is used only on the server.
        const adminClient = createClient(supabaseUrl, secretKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
            },
        });

        const { data, error } = await adminClient.auth.admin.listUsers({
            page: 1,
            perPage: 100,
        });

        if (error) {
            console.error("Admin user listing failed:", error.message);

            return NextResponse.json(
                { error: "Could not load platform users." },
                { status: 500 }
            );
        }

        // Return only the information needed by the admin interface.
        const users = data.users.map((account) => ({
            id: account.id,
            email: account.email ?? "",
            name:
                account.user_metadata?.full_name ??
                account.user_metadata?.name ??
                account.user_metadata?.display_name ??
                "",
            role:
                ["admin", "owner"].includes(account.app_metadata?.role)
                    ? account.app_metadata.role
                    : "customer",
            emailConfirmed: Boolean(account.email_confirmed_at),
            createdAt: account.created_at,
            lastSignInAt: account.last_sign_in_at,
        }));

        return NextResponse.json({ users });
    } catch (error) {
        console.error("Admin users API error:", error);

        return NextResponse.json(
            { error: "An unexpected server error occurred." },
            { status: 500 }
        );
    }
}



export async function PATCH(request) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const publishableKey =
            process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
        const secretKey = process.env.SUPABASE_SECRET_KEY;

        if (!supabaseUrl || !publishableKey || !secretKey) {
            return NextResponse.json(
                { error: "Server environment variables are missing." },
                { status: 500 }
            );
        }

        const authorization = request.headers.get("authorization");
        const token = authorization?.startsWith("Bearer ")
            ? authorization.slice(7)
            : null;

        if (!token) {
            return NextResponse.json(
                { error: "Please sign in first." },
                { status: 401 }
            );
        }

        const authClient = createClient(supabaseUrl, publishableKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
            },
        });

        const { data: authData, error: authError } =
            await authClient.auth.getUser(token);

        if (authError || !authData.user) {
            return NextResponse.json(
                { error: "Invalid session." },
                { status: 401 }
            );
        }

        if (authData.user.app_metadata?.role !== "admin") {
            return NextResponse.json(
                { error: "Administrator access required." },
                { status: 403 }
            );
        }

        const body = await request.json();

        if (
            body.email !== "getutesfaye919@gmail.com" ||
            body.role !== "owner"
        ) {
            return NextResponse.json(
                { error: "This operation is not permitted." },
                { status: 400 }
            );
        }

        const adminClient = createClient(supabaseUrl, secretKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
            },
        });

        const { data: listData, error: listError } =
            await adminClient.auth.admin.listUsers({
                page: 1,
                perPage: 1000,
            });

        if (listError) {
            throw listError;
        }

        const account = listData.users.find(
            (user) =>
                user.email?.toLowerCase() === body.email.toLowerCase()
        );

        if (!account) {
            return NextResponse.json(
                { error: "The target account was not found." },
                { status: 404 }
            );
        }

        const { error: updateError } =
            await adminClient.auth.admin.updateUserById(account.id, {
                app_metadata: {
                    ...account.app_metadata,
                    role: "owner",
                },
                user_metadata: {
                    ...account.user_metadata,
                    full_name: "Getu Tesfaye",
                    name: "Getu Tesfaye",
                },
            });

        if (updateError) {
            throw updateError;
        }

        return NextResponse.json({
            success: true,
            message: "Account updated successfully.",
        });
    } catch (error) {
        console.error("Admin account update failed:", error.message);

        return NextResponse.json(
            { error: "Could not update the account." },
            { status: 500 }
        );
    }
}
