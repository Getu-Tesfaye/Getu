import { createClient } from "@/lib/supabase/server";
import { kitchen, getDeliveryPoint } from "@/lib/places";

const steps = [
  { status: "Order received", progress: 0 },
  { status: "Preparing", progress: 0 },
  { status: "Courier picked up", progress: 0.1 },
  { status: "On the way", progress: 0.5 },
  { status: "Almost there", progress: 0.9 },
  { status: "Delivered", progress: 1 },
];

export async function GET(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    return new Response("Please sign in.", { status: 401 });
  }

  const { data: order } = await supabase
    .from("orders")
    .select("id, delivery_area")
    .eq("id", id)
    .maybeSingle();

  if (!order) {
    return new Response("Order not found.", { status: 404 });
  }

  const delivery = getDeliveryPoint(order.delivery_area);
  const lastId = request.headers.get("last-event-id");
  const parsed = Number(lastId);
  const start = lastId !== null && Number.isInteger(parsed) ? parsed + 1 : 0;
  let step = Math.min(start, steps.length - 1);

  const encoder = new TextEncoder();
  let timer;

  const stream = new ReadableStream({
    start(controller) {
      function send() {
        const current = steps[step];
        const payload = {
          status: current.status,
          courier: {
            lat: kitchen.lat + (delivery.lat - kitchen.lat) * current.progress,
            lng: kitchen.lng + (delivery.lng - kitchen.lng) * current.progress,
          },
          updatedAt: new Date().toISOString(),
        };

        controller.enqueue(
          encoder.encode(`id: ${step}\ndata: ${JSON.stringify(payload)}\n\n`)
        );

        if (step >= steps.length - 1) {
          clearInterval(timer);
          controller.close();
          return;
        }

        step += 1;
      }

      send();
      timer = setInterval(send, 3000);

      request.signal.addEventListener("abort", () => {
        clearInterval(timer);
        try {
          controller.close();
        } catch {}
      });
    },
    cancel() {
      clearInterval(timer);
    },
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