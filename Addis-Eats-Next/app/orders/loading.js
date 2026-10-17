export default function OrdersLoading() {
  return (
    <div role="status" aria-label="Loading orders">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          className="skeleton-line"
          key={index}
          style={{ height: 40, marginBottom: 12 }}
        ></div>
      ))}
    </div>
  );
}