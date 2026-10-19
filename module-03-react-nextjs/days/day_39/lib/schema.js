import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  area: z.string().min(2, "Area is required"),
  paymentMethod: z.enum(["TeleBirr", "Cash"]),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number().min(1),
    })
  ),
});