import { ImageResponse } from "next/og";
import dishes from "../data";

export const runtime = "edge";

export default async function Image({ params }) {
  const { id } = await params;

  const dish = dishes.find((dish) => dish.id === Number(id));

  if (!dish) {
    return new ImageResponse(
      <div
        style={{
          fontSize: 60,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Dish Not Found
      </div>
    );
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
      }}
    >
      <div
        style={{
          fontSize: 70,
          fontWeight: "bold",
        }}
      >
        {dish.name}
      </div>

      <div
        style={{
          fontSize: 40,
          marginTop: 20,
        }}
      >
        {dish.price} ETB · Addis Eats
      </div>
    </div>
  );
}