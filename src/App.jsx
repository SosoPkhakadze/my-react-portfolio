import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import CursorTrail from './components/CursorTrail/CursorTrail';
import Particles from './components/Particles/Particles';
import './App.css';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(prefersDarkScheme.matches);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const element = document.querySelector(this.getAttribute('href'));
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className={`App ${isDarkMode ? 'dark-theme' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Welcome />
      <Experience />
      <Projects isDarkMode={isDarkMode} />
      <Skills />
      <Education />
      <Contact />
      <CursorTrail isDarkMode={isDarkMode} />
      <Particles isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;