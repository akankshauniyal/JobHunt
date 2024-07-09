import React from 'react';
import './footer.css'; // Make sure to create and import this CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="foot_container">
        <div className="footer-section">
          <h4>JobHunt</h4>
          <p>Your go-to platform for job searching and recruitment.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@jobhunt.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 JobHunt St, WorkCity, WC 12345</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} JobHunt. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
