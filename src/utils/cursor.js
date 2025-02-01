// In the `utils` folder, create another file `cursor.js`

let cursorTrail = [];
const trailLength = 15;

// Initialize cursor trail elements
function initCursorTrail() {
  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.classList.add('cursor-trail');
    document.body.appendChild(dot);
    cursorTrail.push(dot);
  }
}

// Update cursor colors based on theme
export function updateCursorColors(isDark) {
  cursorTrail.forEach(dot => {
    dot.style.background = isDark ? 'var(--accent-color-dark)' : 'var(--accent-color-light)';
  });
}

// Handle mouse movement
function handleMouseMove(e) {
  const x = e.clientX;
  const y = e.clientY;

  cursorTrail.forEach((dot, index) => {
    function updatePosition() {
      dot.style.left = x + 'px';
      dot.style.top = y + 'px';
      dot.style.opacity = index / trailLength;
      dot.style.transform = `scale(${index / trailLength})`;
    }

    setTimeout(updatePosition, index * 15);
  });
}

// Initialize cursor effects
function initCursorEffects() {
  initCursorTrail();

  document.addEventListener('mousemove', handleMouseMove);

  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    document.querySelectorAll('.particle').forEach(particle => {
        const particleX = particle.offsetLeft + particle.offsetWidth / 2;
        const particleY = particle.offsetTop + particle.offsetHeight / 2;

        const distanceX = mouseX - particleX;
        const distanceY = mouseY - particleY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        const maxDistance = 200; // Affect particles within 200px radius

        if (distance < maxDistance) {
            // Move particles away from cursor
            const angle = Math.atan2(distanceY, distanceX);
            const force = (maxDistance - distance) / maxDistance; // Normalized force
            const moveX = Math.cos(angle) * force * 10; // Multiply by 10 for more visible effect
            const moveY = Math.sin(angle) * force * 10;

            particle.style.transition = 'transform 0.3s ease';
            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else if (particle.style.transform) {
            // Reset particle position if outside the radius
            particle.style.transition = 'transform 0.5s ease';
            particle.style.transform = '';
        }
    });
  });

  let lastX = 0, lastY = 0;
  document.addEventListener("mousemove", (e) => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;

    // Create splashing particles
    for (let i = 0; i < 5; i++) {  // Adjust for more/less splash density
      const particle = document.createElement("div");
      particle.classList.add("cursor-particle");
      document.body.appendChild(particle);

      const size = Math.random() * 3 + 2; // Tiny particles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      const angle = Math.random() * Math.PI * 2; // Random direction
      const speed = Math.random() * 15 + 5; // Random speed
      const velocityX = Math.cos(angle) * speed + dx * 0.4; // Add motion influence
      const velocityY = Math.sin(angle) * speed + dy * 0.4;

      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;

      // Animate particles with a natural arc
      setTimeout(() => {
        particle.style.transform = `translate(${velocityX}px, ${velocityY}px) scale(0)`;
        particle.style.opacity = "0";
      }, Math.random() * 200 + 100); // Vary lifespan

      // Remove after animation
      setTimeout(() => particle.remove(), 600);
    }
  });
}

// Call the initialization function
initCursorEffects();