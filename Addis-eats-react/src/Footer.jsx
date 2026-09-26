import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaTelegramPlane, FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>Addis Eats</h2>
          <p>Delicious food delivered to your door.</p>
          <p>Fresh meals. Fast delivery. Great taste.</p>
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
          <div className="footer-contact-item">
            <MapPin size={18} />
            <span>Addis Ababa, Ethiopia</span>
          </div>
          <div className="footer-contact-item">
            <Phone size={18} />
            <span>+251 900 770469</span>
          </div>
          <div className="footer-contact-item">
            <Mail size={18} />
            <span>getutesfaye919@gmail.com</span>
          </div>
          <div className="footer-contact-item">
            <Clock size={18} />
            <span>Open: 1:00 AM - 10:00 PM</span>
          </div>

          <div className="footer-socials">
            <a href="#" aria-label="Facebook"><FaFacebookF size={16} /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn size={16} /></a>
            <a href="#" aria-label="Telegram"><FaTelegramPlane size={16} /></a>
            <a href="#" aria-label="TikTok"><FaTiktok size={16} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Getu Tesfaye. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;