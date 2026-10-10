import { NextResponse } from "next/server";
import { fetchAllDishes } from "@/services/dishServices";

export async function GET() {
  const dishes = await fetchAllDishes();
  

  return NextResponse.json(dishes);
}