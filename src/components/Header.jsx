import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-scroll';

function Header({ isDarkMode, toggleDarkMode }) {
    const [hasScrolled, setHasScrolled] = useState(false);

    const applyCommonStyle = () => {
        const headerContainer = document.querySelector(".header-container");
        headerContainer.style.transition = "background-color 0.5s ease-in-out";
    };

    const applyHeaderStyle = (isDarkMode) => {
        const headerContainer = document.querySelector(".header-container");
        const navLinks = document.querySelectorAll(".navigation a");
        applyCommonStyle();

        if (isDarkMode) {
            headerContainer.style.backgroundColor = "transparent"; // Changed to transparent
            navLinks.forEach(link => link.style.color = "#f0f0f0");
        } else {
            headerContainer.style.backgroundColor = "transparent"; // Changed to transparent
            navLinks.forEach(link => link.style.color = "#333");
        }
    };

    useEffect(() => {
        applyHeaderStyle(isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`main-header ${hasScrolled ? 'visible' : ''}`}>
            <div className="header-container">
                <div className="logo">
                    <img src="/SP.png" alt="Your Initials" />
                </div>
                <nav className="navigation">
                    <ul>
                        <li>
                            <Link to="welcome" smooth={true} duration={500}>
                                Welcome
                            </Link>
                        </li>
                        <li>
                            <Link to="education" smooth={true} duration={500}>
                                Education
                            </Link>
                        </li>
                        <li>
                            <Link to="experience" smooth={true} duration={500}>
                                Experience
                            </Link>
                        </li>
                        <li>
                            <Link to="projects" smooth={true} duration={500}>
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link to="skills" smooth={true} duration={500}>
                                Skills
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="toggle-container">
                    <button onClick={toggleDarkMode}>
                        {isDarkMode ? 'Light' : 'Dark'}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;