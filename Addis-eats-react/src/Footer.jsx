import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-section">
                    <h2>Addis Eats</h2>
                    <p>
                        Delicious food delivered to your door.
                    </p>
                    <p>
                        Fresh meals. Fast delivery. Great taste.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/favorites">Favorites</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/checkout">Checkout</Link>
                </div>

                <div className="footer-section">
                    <h3>Contact Us</h3>

                    <p>📍 Addis Ababa, Ethiopia</p>
                    <p>📞 +251 900 678765</p>
                    <p>✉️ addis.com</p>
                    <p>🕒 Open: 1:00 AM - 10:00 PM</p>
                </div>

                <div className="footer-section">
                    <h3>Follow Us</h3>

                    <a href="#" target="_blank">Facebook</a>
                    <a href="#" target="_blank">Instagram</a>
                    <a href="#" target="_blank">Telegram</a>
                    <a href="#" target="_blank">TikTok</a>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 Addis Eats. All rights reserved.</p>

                <div className="footer-bottom-links">
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms & Conditions</Link>
                </div>
            </div>

        </footer>
    );
}

export default Footer;