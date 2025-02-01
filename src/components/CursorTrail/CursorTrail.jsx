// src/components/CursorTrail/CursorTrail.jsx
import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './CursorTrail.css';

const CursorTrail = () => {
  const { isDarkMode } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const trailLength = 15;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Create splash particles
      createSplashParticles(e);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const createSplashParticles = (e) => {
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.classList.add('cursor-particle');
      document.body.appendChild(particle);

      const size = Math.random() * 3 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = isDarkMode ? 
        'var(--accent-color-dark)' : 
        'var(--accent-color-light)';

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 15 + 5;
      const velocityX = Math.cos(angle) * speed;
      const velocityY = Math.sin(angle) * speed;

      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;

      requestAnimationFrame(() => {
        particle.style.transform = `translate(${velocityX}px, ${velocityY}px) scale(0)`;
        particle.style.opacity = '0';
      });

      setTimeout(() => particle.remove(), 600);
    }
  };

  return (
    <div className="cursor-container">
      {[...Array(trailLength)].map((_, index) => (
        <div
          key={index}
          className="cursor-trail"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            opacity: (trailLength - index) / trailLength,
            transform: `scale(${(trailLength - index) / trailLength})`,
            transition: `all ${index * 0.015}s ease`,
            backgroundColor: isDarkMode ? 
              'var(--accent-color-dark)' : 
              'var(--accent-color-light)',
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;