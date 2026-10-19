import { NextResponse } from "next/server";

export async function GET() {
  const dishes = [
    {
      id: 1,
      name: "Doro Wat",
      category: "Special",
      price: 350,
    },
    {
      id: 2,
      name: "Tibs",
      category: "Special",
      price: 320,
    },
    {
      id: 3,
      name: "Shiro Wat",
      category: "Special",
      price: 180,
    },
    {
      id: 4,
      name: "Kitfo",
      category: "Special",
      price: 400,
    },
  ];

  return NextResponse.json(dishes);
}