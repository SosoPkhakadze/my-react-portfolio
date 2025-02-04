import React, { useState, useEffect, useRef } from "react";
import "./Header.css";

const Header = ({ isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("welcome");
  const headerRef = useRef(null);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - headerHeight -1; // Adjust for header height

        const sectionHeight = section.clientHeight;
        const scroll = window.scrollY;

        // Add extra condition to mark the section as active slightly before it hits the top
        if (
          scroll >= sectionTop &&
          scroll < sectionTop + sectionHeight
        ) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };


    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "welcome" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Education", id: "education" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header className={`header ${isDarkMode ? "dark-theme" : ""}`} ref={headerRef}>
      <div className="nav">
        {/* Logo Container */}
        <div className="logo-container">
          <img
            src={`${import.meta.env.BASE_URL}SP.png`}
            alt="Logo"
            className="logo"
          />
        </div>

        {/* Navigation List */}
        <nav>
          <button
            id="hamburger-btn"
            onClick={toggleMenu}
            className={isMenuOpen ? "active" : ""}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <ul className={`nav-list ${isMenuOpen ? "active" : ""}`}>
            {navItems.map(({ label, id }) => (
              <li
                key={label}
                className={activeSection === id ? "active" : ""}
              >
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme Toggle Button */}
        <button id="theme-toggle" onClick={toggleTheme}>
          <i className={`toggle-icon sun-icon bx bxs-sun`}></i>
          <i className={`toggle-icon moon-icon bx bxs-moon`}></i>
        </button>
      </div>
    </header>
  );
};

export default Header;