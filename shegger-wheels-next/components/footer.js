export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>
            Sheggar <span>Wheels</span>
          </h2>
          <p>Your journey, your freedom. Find the right car for every trip.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/cars">Browse Cars</a>
          <a href="/bookings">Bookings</a>
          <a href="/my-bookings">Renter Dashboard</a>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>getutesfaye919@gmail.com, Addis Ababa, Ethiopia.</p>
          <p>Sheggar Wheels Car Rental</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Getu T. All rights reserved.</p>
      </div>
    </footer>
  );
}