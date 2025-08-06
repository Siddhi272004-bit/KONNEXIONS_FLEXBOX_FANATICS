import React from 'react';
import { Link } from 'react-router-dom';
import './Home_style.css';

function Home() {
  return (
    <div>
      <header className="navbar">
        <div className="logo">BookEasy</div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/#features">Features</Link></li> 
            <li><Link to="/#how-it-works">How It Works</Link></li>
            <li><Link to="/#contact">Contact</Link></li>

          </ul>
        </nav>
        <div className="auth-buttons">
          <Link to="/register" className="btn primary">Register as User/Vendor</Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Discover &amp; Book Events Near You</h1>
          <p>Find the perfect experience in just a few clicks — fast, easy, unforgettable!</p>
          <div className="hero-buttons">
            <div className="d-flex justify-content-center gap-3">
              <Link to="/login/customer" className="btn primary">
                Login as Customer
              </Link>
              <Link to="/login/vendor" className="btn primary">
                Login as Vendor
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="/evt.jpg" alt="People enjoying an event" />
        </div>
      </section>

      <section id="features" className="features">
        <h2>Why Choose BookEasy?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">📅</div>
            <h3>Easy Booking</h3>
            <p>Simple and intuitive booking process for any event or space.</p>
          </div>
          <div className="feature-card">
            <div className="icon">💼</div>
            <h3>Business Solutions</h3>
            <p>Powerful tools to manage your bookings and grow your business.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🔍</div>
            <h3>Advanced Filters</h3>
            <p>Find exactly what you're looking for with our smart filters.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">BookEasy</div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/blog">Blog</Link>
            </div>
            <div className="link-group">
              <h4>Support</h4>
              <Link to="/help">Help Center</Link>
              <Link to="/safety">Safety</Link>
              <Link to="/community">Community</Link>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 BookEasy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
