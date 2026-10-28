
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

export async function POST(request) {
  try {
    if (!supabaseUrl || !supabasePublishableKey || !supabaseSecretKey) {
      return NextResponse.json(
        { error: "Server database configuration is missing." },
        { status: 500 }
      );
    }

    // 1. Get the customer's access token.
    const authorization = request.headers.get("authorization");
    const token = authorization?.startsWith("Bearer ")
      ? authorization.slice(7)
      : null;

    if (!token) {
      return NextResponse.json(
        { error: "Please sign in before reporting a problem." },
        { status: 401 }
      );
    }

    // 2. Verify the customer using Supabase Authentication.
    const authClient = createClient(
      supabaseUrl,
      supabasePublishableKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const { data: authData, error: authError } =
      await authClient.auth.getUser(token);

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: "Your session is invalid. Please sign in again." },
        { status: 401 }
      );
    }

    const user = authData.user;

    // 3. Read the submitted report.
    const body = await request.json();
    const { booking_id, title, description } = body;

    if (
      typeof booking_id !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(booking_id)
    ) {
      return NextResponse.json(
        { error: "Please select a valid booking." },
        { status: 400 }
      );
    }

    if (
      typeof title !== "string" ||
      !title.trim() ||
      title.trim().length > 150 ||
      typeof description !== "string" ||
      !description.trim() ||
      description.trim().length > 5000
    ) {
      return NextResponse.json(
        { error: "Enter a title and description within the allowed limits." },
        { status: 400 }
      );
    }

    // 4. Use the server-only secret key for protected database operations.
    const adminClient = createClient(
      supabaseUrl,
      supabaseSecretKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    // 5. Confirm this booking belongs to the signed-in customer.
    const { data: booking, error: bookingError } = await adminClient
      .from("bookings")
      .select("id, user_id")
      .eq("id", booking_id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (bookingError) {
      console.error("Booking verification failed:", bookingError);

      return NextResponse.json(
        { error: "Could not verify this booking." },
        { status: 500 }
      );
    }

    if (!booking) {
      return NextResponse.json(
        { error: "This booking was not found in your account." },
        { status: 403 }
      );
    }

    // 6. Save the customer's report in the disputes table.
    const { data: dispute, error: insertError } = await adminClient
      .from("disputes")
      .insert({
        booking_id: booking.id,
        reported_by: user.id,
        title: title.trim(),
        description: description.trim(),
        status: "open",
      })
      .select("id, title, status, created_at")
      .single();

    if (insertError) {
      console.error("Dispute submission failed:", insertError);

      return NextResponse.json(
        { error: "Could not save your report. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Your report was submitted successfully.",
        dispute,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Report API error:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred while submitting your report." },
      { status: 500 }
    );
  }
}
