
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

export async function handleAppAction(prevState, formData) {
  const intent = formData.get("intent");

  // ADMIN LOGIN
  if (intent === "login") {
    const username = String(
      formData.get("username") || ""
    ).trim();

    const password = String(
      formData.get("password") || ""
    );

    if (!username || !password) {
      return {
        success: false,
        message: "Username and password are required.",
      };
    }

    if (
      !process.env.ADMIN_USERNAME ||
      !process.env.ADMIN_PASSWORD ||
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return {
        success: false,
        message: "Invalid username or password.",
      };
    }

    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!secret) {
      return {
        success: false,
        message: "Admin session is not configured.",
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("addis_admin", secret, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    redirect("/admin");
  }

  // ADMIN LOGOUT
  if (intent === "logout") {
    const cookieStore = await cookies();

    cookieStore.delete("addis_admin");

    redirect("/login");
  }

  // CUSTOMER ORDER
  if (intent === "order") {
    const supabase = await createClient();

    const {
      data: { claims },
      error: authError,
    } = await supabase.auth.getClaims();

    if (authError || !claims?.sub) {
      return {
        success: false,
        message: "Please sign in before placing an order.",
        total: 0,
      };
    }

    const name = String(
      formData.get("name") || ""
    ).trim();

    const phone = String(
      formData.get("phone") || ""
    ).trim();

    const area = String(
      formData.get("area") || ""
    ).trim();

    const payment = String(
      formData.get("payment") || ""
    ).trim();

    if (!name || !area) {
      return {
        success: false,
        message: "Name and delivery area are required.",
        total: 0,
      };
    }

    if (!/^\d{10}$/.test(phone)) {
      return {
        success: false,
        message: "Phone number must contain exactly 10 digits.",
        total: 0,
      };
    }

    if (!["TeleBirr", "Cash"].includes(payment)) {
      return {
        success: false,
        message: "Please select a valid payment method.",
        total: 0,
      };
    }

    let cart;

    try {
      cart = JSON.parse(
        String(formData.get("cart") || "[]")
      );
    } catch {
      return {
        success: false,
        message: "Invalid cart data.",
        total: 0,
      };
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      return {
        success: false,
        message: "Your cart is empty.",
        total: 0,
      };
    }

    const validCart = [];

    for (const item of cart) {
      const id = String(item?.id || "");
      const quantity = Number(item?.quantity);

      if (
        !id ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 99
      ) {
        return {
          success: false,
          message:
            "Your cart contains an invalid item or quantity.",
          total: 0,
        };
      }

      validCart.push({ id, quantity });
    }

    const { data, error } = await supabase.rpc(
      "create_customer_order",
      {
        p_customer_name: name,
        p_phone: phone,
        p_delivery_area: area,
        p_payment_method: payment,
        p_cart: validCart,
      }
    );

    if (error) {
      console.error(
        "Order creation failed:",
        error.message
      );

      return {
        success: false,
        message:
          "We could not save your order. Please try again.",
        total: 0,
      };
    }

    if (
      !data ||
      data.success !== true ||
      !data.order_id ||
      !Number.isFinite(Number(data.total))
    ) {
      return {
        success: false,
        message:
          "The database returned an unexpected response.",
        total: 0,
      };
    }

    return {
      success: true,
      message: `Thank you ${name}! Your order has been saved.`,
      customerName: name,
      total: Number(data.total),
      orderId: data.order_id,
    };
  }

  return {
    success: false,
    message: "Invalid request.",
  };
}
