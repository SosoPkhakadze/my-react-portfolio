import React, { useEffect } from 'react';
import './Welcome.css';

const Welcome = () => {
  useEffect(() => {
    const orbitSystem = document.querySelector('.orbit-system');
    const bgInitials = document.querySelector('.bg-initials');

    const handleMouseMove = (e) => {
      const rect = orbitSystem.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      orbitSystem.style.transform = `rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    };

    const handleMouseLeave = () => {
      orbitSystem.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    const handleScroll = () => {
      const scrollValue = window.scrollY;
      bgInitials.style.transform = `translateY(${scrollValue * 0.4}px) scale(1.1)`;
    };

    orbitSystem.addEventListener('mousemove', handleMouseMove);
    orbitSystem.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    return () => {
      orbitSystem.removeEventListener('mousemove', handleMouseMove);
      orbitSystem.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="welcome" className="welcome-section">
      <div className="bg-initials"></div>
      <div className="intro-content">
        <div className="orbit-system">
          <div className="profile-orbit"></div>
          <div className="profile-orbit"></div>
          <div className="profile-orbit"></div>
          <div className="orbit-glow"></div>
          <div className="central-logo">
            <img src="public\SP.png" alt="Profile Logo" className="profile-logo" />
          </div>
        </div>
        <div className="name-title">
          <h1 className="name">Your Name</h1>
          <div className="tagline-wrapper">
            <p className="tagline">Your Tagline</p>
            <span className="tagline-decoration"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;