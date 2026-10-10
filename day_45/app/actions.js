
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDishes } from "../data/dishes";

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

  // ADMIN LOGOUT
  if (intent === "logout") {
    const cookieStore = await cookies();

    cookieStore.delete("addis_admin");

    redirect("/login");
  }

  // CUSTOMER ORDER
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

    // Validate customer information
    if (!name) {
      return {
        success: false,
        message: "Name is required.",
      };
    }

    if (!/^\d{10}$/.test(phone)) {
      return {
        success: false,
        message: "Phone number must contain exactly 10 digits.",
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

    // Read the cart safely
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

    // Get trusted dish information from the server
    const dishes = await getDishes();

    let total = 0;

    // Validate every item and calculate the total
    for (const item of cart) {
      if (
        !item ||
        typeof item.id !== "string" ||
        !/^\d+$/.test(item.id) ||
        !Number.isInteger(Number(item.quantity)) ||
        Number(item.quantity) <= 0
      ) {
        return {
          success: false,
          message: "Invalid cart item.",
        };
      }

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

      total += serverDish.price * quantity;
    }

    // Return successful order information
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
