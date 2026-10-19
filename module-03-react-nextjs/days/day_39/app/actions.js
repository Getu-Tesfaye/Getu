"use server";

import { orderSchema } from "@/lib/schema";

export async function placeOrder(formData) {
  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    area: formData.get("area"),
    paymentMethod: formData.get("paymentMethod"),
    items: JSON.parse(formData.get("items") || "[]"),
  };

  const result = orderSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      status: 422,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const order = {
    id: Date.now().toString(),
    ...result.data,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  return {
    success: true,
    status: 201,
    order,
  };
}

export async function cancelOrder(orderId) {
  return {
    success: true,
    message: `Order ${orderId} cancelled`,
  };
}