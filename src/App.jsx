import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Welcome from './components/Welcome';
import WorkExperience from './components/WorkExperience';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const applyAppTheme = (isDarkMode) => {
    const body = document.body;
    body.classList.toggle('dark-mode', isDarkMode);
    body.classList.toggle('light-mode', !isDarkMode);
  };

  useEffect(() => {
    applyAppTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <div>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Welcome />
      <WorkExperience />
      <Education />
      <Projects />
      <Skills />
      <Footer />
    </div>
  );
}

export default App;