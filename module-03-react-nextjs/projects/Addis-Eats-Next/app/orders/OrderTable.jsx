import Link from "next/link";

const pageSize = 5;

export default function OrderTable({ orders, sort, dir, page }) {
  const sortedOrders = [...orders].sort((first, second) => {
    const firstValue =
      sort === "total" ? Number(first.total) : new Date(first.created_at);
    const secondValue =
      sort === "total" ? Number(second.total) : new Date(second.created_at);

    return dir === "asc" ? firstValue - secondValue : secondValue - firstValue;
  });

  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / pageSize));
  const currentPage = Math.min(Math.max(Number(page) || 1, 1), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const rows = sortedOrders.slice(startIndex, startIndex + pageSize);

  function makeLink(newSort, newDir, newPage) {
    return `/dashboard?sort=${newSort}&dir=${newDir}&page=${newPage}`;
  }

  function nextDirection(column) {
    return sort === column && dir === "desc" ? "asc" : "desc";
  }

  function ariaSort(column) {
    if (sort !== column) return "none";
    return dir === "asc" ? "ascending" : "descending";
  }

  return (
    <section>
      <h2>Orders</h2>

      <table>
        <caption>
          Orders sorted by {sort}, {dir === "asc" ? "ascending" : "descending"}.
          Page {currentPage} of {totalPages}.
        </caption>

        <thead>
          <tr>
            <th scope="col">Order</th>
            <th scope="col">Neighbourhood</th>
            <th scope="col" aria-sort={ariaSort("date")}>
              <Link href={makeLink("date", nextDirection("date"), 1)}>Date</Link>
            </th>
            <th scope="col" aria-sort={ariaSort("total")}>
              <Link href={makeLink("total", nextDirection("total"), 1)}>
                Total (ETB)
              </Link>
            </th>
            <th scope="col">Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((order) => (
            <tr key={order.id}>
              <th scope="row">{order.id}</th>
              <td>{order.neighbourhood}</td>
              <td>{order.created_at.slice(0, 10)}</td>
              <td>{Number(order.total).toLocaleString()}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav aria-label="Order pages">
        {currentPage > 1 ? (
          <Link href={makeLink(sort, dir, currentPage - 1)}>Previous</Link>
        ) : (
          <span aria-disabled="true">Previous</span>
        )}

        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>

        {currentPage < totalPages ? (
          <Link href={makeLink(sort, dir, currentPage + 1)}>Next</Link>
        ) : (
          <span aria-disabled="true">Next</span>
        )}
      </nav>
    </section>
  );
}