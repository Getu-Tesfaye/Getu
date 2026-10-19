

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const search = searchParams.get("search") || ""
  const page = Number(searchParams.get("page")) || 1

  const dishes = [
    { id: 1, name: "dorowat", price: 300 },
    { id: 2, name: "shiro", price: 240 },
    { id: 3, name: "kitfo", price: 600 },
    { id: 4, name: "burger", price: 500 },
    { id: 5, name: "pizza", price: 300 }
  ]

  const filtered = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase())
  )

  const pageSize = 2
  const start = (page - 1) * pageSize
  const paged = filtered.slice(start, start + pageSize)

  return Response.json(paged)
}