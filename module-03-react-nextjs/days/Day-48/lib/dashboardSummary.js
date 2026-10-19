export function revenueByNeighbourhood(orders) {
  const totals = {};

  for (const order of orders) {
    const place = order.neighbourhood || "Unknown";
    totals[place] = (totals[place] || 0) + Number(order.total);
  }

  return Object.entries(totals).map(([neighbourhood, revenue]) => ({
    neighbourhood,
    revenue,
  }));
}

export function ordersPerDay(orders) {
  const counts = {};

  for (const order of orders) {
    const day = order.created_at.slice(0, 10);
    counts[day] = (counts[day] || 0) + 1;
  }

  return Object.entries(counts)
    .sort(([firstDay], [secondDay]) => firstDay.localeCompare(secondDay))
    .map(([day, count]) => ({ day, count }));
}