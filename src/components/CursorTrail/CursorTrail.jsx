import React, { useState, useEffect, useRef } from 'react';
import './CursorTrail.css';

const CursorTrail = ({ isDarkMode }) => {
  const [trail, setTrail] = useState([]);
  const trailLength = 15;
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      lastPos.current = { x: clientX, y: clientY };

      // Update trail positions with delay
      cursorTrail.forEach((dot, index) => {
        setTimeout(() => {
          dot.style.left = clientX + 'px';
          dot.style.top = clientY + 'px';
          dot.style.opacity = index / trailLength;
          dot.style.transform = `scale(${index / trailLength})`;
        }, index * 15);
      });

      // Create splashing particles
      for (let i = 0; i < 5; i++) {
        createSplatterParticle(clientX, clientY);
      }
    };

    const createTrailElements = () => {
      const newTrail = [];
      for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.classList.add('cursor-trail');
        updateElementColor(dot); // Update color on creation
        document.body.appendChild(dot);
        newTrail.push(dot);
      }
      setTrail(newTrail);
      return newTrail;
    };

    const createSplatterParticle = (x, y) => {
      const particle = document.createElement('div');
      particle.classList.add('cursor-particle');
      updateElementColor(particle); // Update color on creation
      document.body.appendChild(particle);

      const size = Math.random() * 3 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 15 + 5;
      const velocityX = Math.cos(angle) * speed + dx * 0.4;
      const velocityY = Math.sin(angle) * speed + dy * 0.4;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      setTimeout(() => {
        particle.style.transform = `translate(${velocityX}px, ${velocityY}px) scale(0)`;
        particle.style.opacity = '0';
      }, Math.random() * 200 + 100);

      setTimeout(() => particle.remove(), 600);
    };

    // Helper function to update element color based on theme
    const updateElementColor = (element) => {
      if (isDarkMode) {
        element.style.background = 'var(--accent-color-dark)';
      } else {
        element.style.background = 'var(--accent-color-light)';
      }
    };

    const cursorTrail = createTrailElements();

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cursorTrail.forEach((dot) => dot.remove());
    };
  }, [isDarkMode]); // Add isDarkMode as a dependency

  return null; // No need to render anything, as elements are added to the DOM directly
};

export default CursorTrail;