"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDishes } from "../data/dishes";

export async function handleAppAction(prevState, formData) {
  const intent = formData.get("intent");

  // -------------------------
  // LOGIN
  // -------------------------

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
      username !== "getu" ||
      password !== "getu1234"
    ) {
      return {
        success: false,
        message: "Invalid username or password.",
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("addis_admin", "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    redirect("/admin");
  }

  // -------------------------
  // LOGOUT
  // -------------------------

  if (intent === "logout") {
    const cookieStore = await cookies();

    cookieStore.delete("addis_admin");

    redirect("/login");
  }

  // -------------------------
  // ORDER
  // -------------------------

  if (intent === "order") {
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

    const cartString = String(
      formData.get("cart") || "[]"
    );

    if (!name) {
      return {
        success: false,
        message: "Name is required.",
      };
    }

    if (!/^\d{10}$/.test(phone)) {
      return {
        success: false,
        message:
          "Phone number must contain exactly 10 digits.",
      };
    }

    if (!area) {
      return {
        success: false,
        message: "Delivery area is required.",
      };
    }

    if (
      payment !== "TeleBirr" &&
      payment !== "Cash"
    ) {
      return {
        success: false,
        message: "Please select a valid payment method.",
      };
    }

    let cart;

    try {
      cart = JSON.parse(cartString);
    } catch {
      return {
        success: false,
        message: "Invalid cart data.",
      };
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      return {
        success: false,
        message: "Your cart is empty.",
      };
    }

    // Get trusted prices from the server.
    const dishes = await getDishes();

    let total = 0;

    for (const item of cart) {
      const serverDish = dishes.find(
        (dish) => dish.id === item.id
      );

      if (!serverDish) {
        return {
          success: false,
          message: "One of the selected dishes is invalid.",
        };
      }

      const quantity = Number(item.quantity);

      if (
        !Number.isInteger(quantity) ||
        quantity <= 0
      ) {
        return {
          success: false,
          message: "Invalid item quantity.",
        };
      }

      total += serverDish.price * quantity;
    }

    return {
      success: true,
      message: `Thank you ${name}! Your order has been received.`,
      customerName: name,
      total,
    };
  }

  return {
    success: false,
    message: "Invalid request.",
  };
}