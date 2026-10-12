export default function Loading() {
  return (
    <div className="page">
      <div className="page-heading">
        <h1>Our Menu</h1>
        <p>Loading delicious dishes...</p>
      </div>

      <div className="dish-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="dish-card skeleton-card" key={index}>
            <div className="skeleton-image" />

            <div className="dish-card-content">
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line" />
              <div className="skeleton-line skeleton-price" />
              <div className="skeleton-button" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}