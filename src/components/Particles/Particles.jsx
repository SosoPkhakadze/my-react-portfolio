import React, { useEffect, useRef } from 'react';
import './Particles.css';

const Particles = ({ isDarkMode }) => {
  const particlesRef = useRef([]);

  useEffect(() => {
    const numParticles = 400;
    // Create a container for the particles and attach it to the body
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container'); // Add the new class to the container
    document.body.appendChild(particlesContainer);

    const newParticles = [];
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      // Apply dark-theme class directly if dark mode is enabled
      if (isDarkMode) {
        particle.classList.add('dark-theme');
      }

      // Randomize position, size, and animation delay
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const delay = Math.random() * 5; // Changed delay for the floating effect

      particle.style.left = `${x}vw`;
      particle.style.top = `${y}vh`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.animationDelay = `${delay}s`;

      particlesContainer.appendChild(particle);
      newParticles.push(particle);
    }

    particlesRef.current = newParticles;

    // Cleanup function to remove particles and container when the component unmounts
    return () => {
      particlesRef.current.forEach((particle) => particle.remove());
      particlesContainer.remove();
    };
  }, [isDarkMode]);

  return null;
};

export default Particles;