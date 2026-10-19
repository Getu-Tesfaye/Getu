
export default function Loading() {
  return (
    <div className="page">
      <div className="dish-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="dish-card skeleton-card" key={index}>
            <div className="skeleton-image"></div>

            <div className="dish-card-content">
              <div className="skeleton-line skeleton-title"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line skeleton-price"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
