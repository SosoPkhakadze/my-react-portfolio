import React, { useState } from 'react';
import './Header.css';

const Header = ({ isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <nav className="nav">
        <button id="hamburger-btn" onClick={toggleMenu} aria-expanded={isMenuOpen}>
          ☰
        </button>
        <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#welcome" onClick={toggleMenu}>Home</a></li>
          <li><a href="#experience" onClick={toggleMenu}>Experience</a></li>
          <li><a href="#projects" onClick={toggleMenu}>Projects</a></li>
          <li><a href="#skills" onClick={toggleMenu}>Skills</a></li>
          <li><a href="#education" onClick={toggleMenu}>Education</a></li>
          <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
        </ul>
        <button id="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>
    </header>
  );
};

export default Header;