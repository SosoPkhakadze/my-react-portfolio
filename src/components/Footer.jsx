import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>© {new Date().getFullYear()} Soso Pkhakadze</p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/soso-pkhakadze-b89179248/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          {/* Add other social links as needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;