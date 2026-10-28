
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY;

function getSupabaseClients() {
  if (!supabaseUrl || !publishableKey || !secretKey) {
    throw new Error("Supabase environment variables are missing.");
  }

  return {
    authClient: createClient(supabaseUrl, publishableKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }),
    adminClient: createClient(supabaseUrl, secretKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }),
  };
}

async function verifyAdmin(request) {
  const token = request.headers
    .get("authorization")
    ?.replace(/^Bearer\s+/i, "");

  if (!token) {
    return { error: "Please sign in as an administrator.", status: 401 };
  }

  const { authClient, adminClient } = getSupabaseClients();

  const { data, error } = await authClient.auth.getUser(token);

  if (error || !data.user) {
    return { error: "Your session is invalid. Please sign in again.", status: 401 };
  }

  if (data.user.app_metadata?.role !== "admin") {
    return { error: "Administrator access is required.", status: 403 };
  }

  return { adminClient };
}

export async function GET(request) {
  try {
    const result = await verifyAdmin(request);

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    const { data, error } = await result.adminClient
      .from("disputes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Could not load disputes:", error.message);
      return NextResponse.json(
        { error: "Could not load disputes." },
        { status: 500 }
      );
    }

    return NextResponse.json({ disputes: data });
  } catch (error) {
    console.error("Disputes API error:", error.message);

    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const result = await verifyAdmin(request);

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    const body = await request.json();
    const { id, status, admin_decision } = body;

    const allowedStatuses = ["open", "under_review", "resolved"];

    if (
      typeof id !== "string" ||
      !allowedStatuses.includes(status) ||
      typeof admin_decision !== "string"
    ) {
      return NextResponse.json(
        { error: "Please provide a valid dispute ID, status, and decision." },
        { status: 400 }
      );
    }

    if (admin_decision.length > 5000) {
      return NextResponse.json(
        { error: "The decision must be 5,000 characters or fewer." },
        { status: 400 }
      );
    }

    const { data, error } = await result.adminClient
      .from("disputes")
      .update({
        status,
        admin_decision: admin_decision.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Could not update dispute:", error.message);
      return NextResponse.json(
        { error: "Could not update the dispute." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Dispute not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Dispute updated successfully.",
      dispute: data,
    });
  } catch (error) {
    console.error("Disputes API error:", error.message);

    return NextResponse.json(
      { error: "Could not process the request." },
      { status: 500 }
    );
  }
}
