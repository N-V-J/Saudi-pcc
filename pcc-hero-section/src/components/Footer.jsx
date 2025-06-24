import React from 'react';
import '../styles/Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">HRStride.com</span>
          <span className="footer-desc">Saudi PCC Online Service</span>
        </div>
        <nav className="footer-links" aria-label="Footer links">
          <a href="#" className="footer-link">Home</a>
          <a href="#" className="footer-link">Step-by-Step</a>
          <a href="#" className="footer-link">Delivery</a>
          <a href="#" className="footer-link">FAQ</a>
          <a href="#" className="footer-link">Contact</a>
        </nav>
        <div className="footer-contact">
          <span>Email: <a href="mailto:support@hrstride.com">support@hrstride.com</a></span>
          <span>Phone: <a href="tel:+966123456789">+966 12 345 6789</a></span>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} HRStride.com. All rights reserved.
      </div>
    </footer>
  );
} 