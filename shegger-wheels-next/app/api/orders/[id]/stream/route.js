
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
    const { id } = await params;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const secretKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !secretKey) {
        return Response.json(
            { error: "Server Supabase configuration is missing." },
            { status: 500 }
        );
    }

    const supabase = createClient(supabaseUrl, secretKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    });

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            let previousStatus = null;
            let closed = false;
            let polling = null;

            function send(event, data) {
                if (closed) return;

                controller.enqueue(
                    encoder.encode(
                        `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
                    )
                );
            }

            function close() {
                if (closed) return;
                closed = true;
                if (polling) clearInterval(polling);
                request.signal.removeEventListener("abort", abort);
                try {
                    controller.close();
                } catch { }
            }

            function abort() {
                close();
            }

            async function checkStatus() {
                if (closed) return;

                const { data, error } = await supabase
                    .from("bookings")
                    .select("id, status")
                    .eq("id", id)
                    .maybeSingle();

                if (error) {
                    send("stream-error", {
                        message: "Could not check booking status.",
                    });
                    close();
                    return;
                }

                if (!data) {
                    send("stream-error", {
                        message: "Booking not found.",
                    });
                    close();
                    return;
                }

                if (data.status !== previousStatus) {
                    previousStatus = data.status;
                    send("status", {
                        bookingId: data.id,
                        status: data.status,
                        updatedAt: new Date().toISOString(),
                    });
                }

                if (["delivered", "completed"].includes(
                    String(data.status).toLowerCase()
                )) {
                    send("delivered", {
                        bookingId: data.id,
                        status: data.status,
                    });
                    close();
                }
            }

            request.signal.addEventListener("abort", abort);

            send("connection", { connected: true });

            await checkStatus();

            if (!closed) {
                polling = setInterval(checkStatus, 5000);
            }

            if (request.signal.aborted) close();
        },

        cancel() { },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
            "X-Accel-Buffering": "no",
        },
    });
}
