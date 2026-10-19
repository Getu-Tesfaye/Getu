
import { NextResponse } from "next/server";
import { getOrders } from "../../../../data/orders";

export async function GET(request, { params }) {
  const { id } = await params;
  const orders = await getOrders();

  const order = orders.find(
    (item) => String(item.id) === String(id)
  );

  if (!order) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(order);
}

