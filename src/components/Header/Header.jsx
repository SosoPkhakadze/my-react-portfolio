import React, { useState, useEffect, useRef } from "react";
import "./Header.css";

const Header = ({ isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const headerRef = useRef(null);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "experience",
        "projects",
        "skills",
        "education",
        "contact",
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          );
        }
        return false;
      });
      setActiveSection(currentSection || "home");
    };

    // Intersection Observer for smooth active link updates
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = headerRef.current.querySelector(
            `a[href="#${entry.target.id}"]`
          );
          if (link) {
            if (entry.isIntersecting) {
              // Remove active class from all links
              headerRef.current
                .querySelectorAll(".nav-list li")
                .forEach((li) => li.classList.remove("active"));
              // Add active class to the current link
              link.closest("li").classList.add("active");
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

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
            {[
              "Home",
              "Experience",
              "Projects",
              "Skills",
              "Education",
              "Contact",
            ].map((item) => {
              const sectionId =
                item.toLowerCase() === "home" ? "welcome" : item.toLowerCase();
              return (
                <li
                  key={item}
                  className={activeSection === sectionId ? "active" : ""}
                >
                  <a href={`#${sectionId}`}>{item}</a>
                </li>
              );
            })}
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