
import { NextResponse } from "next/server";
import { fetchAllDishes } from "@/services/dishServices";

export async function GET() {
  try {
    const dishes = await fetchAllDishes();

    return NextResponse.json(dishes);
  } catch (error) {
    console.error("Failed to load dishes:", error);

    return NextResponse.json(
      { error: "Failed to load dishes" },
      { status: 500 }
    );
  }
}
