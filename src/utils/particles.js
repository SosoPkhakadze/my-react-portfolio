// In a new folder `utils`, create a file `particles.js`
export function createParticles() {
    const particleContainer = document.querySelector(".particle-container");
    const particleCount = 70; // Number of particles
  
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
  
      // Randomize size, position, and animation properties
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const xShift = Math.random() * 400 - 200; // Horizontal shift
      const yShift = Math.random() * 400 - 200; // Vertical shift
      const delay = Math.random() * 5;
  
      particle.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${x}%;
          top: ${y}%;
          --x-shift: ${xShift};
          --y-shift: ${yShift};
          animation-duration: ${duration}s;
          animation-delay: ${delay}s;
      `;
  
      particleContainer.appendChild(particle);
    }
  }