

"use client"

import useSWR from "swr"
import fetcher from "../../lib/fetcher"

export default function OrderStatus({ id, initialOrder }) {
  const { data, error } = useSWR(
    `/api/orders/${id}`,
    fetcher,
    {
      fallbackData: initialOrder,
      refreshInterval: 5000
    }
  )

  if (error) {
    return <p>Failed to load order</p>
  }

  return (
    <p>Status: {data.status}</p>
  )
}