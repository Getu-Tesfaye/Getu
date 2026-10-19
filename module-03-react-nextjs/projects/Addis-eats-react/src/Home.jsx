import React from "react";
import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="home-hero">
      <div className="home-hero-content">
        <span className="home-hero-script">አዲስ ኢትስ</span>
        <h1>ADDIS EATS</h1>
        <hr className="home-hero-divider" />
        <p>A traditional Ethiopian Dining Experience in Addis Ababa.</p>
        <div className="home-hero-actions">
          <button className="btn-book" onClick={() => navigate("/checkout")}>
            Book a Table
          </button>
          <button className="btn-order" onClick={() => navigate("/menu")}>
            Order & Pickup
          </button>
        </div>
      </div>

      <div className="home-hero-footer">
        <div className="home-hero-phone">
          <Phone size={18} />
          <span>+251 959146526</span>
        </div>
        <div className="home-hero-socials">
          <a href="#"><FaTwitter size={16} /></a>
          <a href="#"><FaFacebookF size={16} /></a>
          <a href="#"><FaInstagram size={16} /></a>
        </div>
      </div>
    </section>
  );
}

export default Home;