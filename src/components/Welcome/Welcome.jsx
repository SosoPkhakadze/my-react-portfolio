import React, { useEffect, useRef } from "react";
import "./Welcome.css";
import { ReactTyped } from "react-typed";

const Welcome = () => {
  const orbitSystemRef = useRef(null);
  const bgInitialsRef = useRef(null);

  useEffect(() => {
    const orbitSystem = orbitSystemRef.current;
    const bgInitials = bgInitialsRef.current;

    // Mouse Move Effect for Orbit System
    const handleMouseMove = (e) => {
      const rect = orbitSystem.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      orbitSystem.style.transform = `rotateX(${-y / 8}deg) rotateY(${x / 8}deg) rotateZ(0deg)`;
    };

    const handleMouseLeave = () => {
      orbitSystem.style.transform = "rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
    };

    // Parallax Scroll Effect for Background Initials
    const handleScroll = () => {
      const scrollValue = window.scrollY;
      bgInitials.style.transform = `translateY(${scrollValue * 0.4}px) scale(1.1)`;
    };

    // Event Listeners
    orbitSystem.addEventListener("mousemove", handleMouseMove);
    orbitSystem.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);

    return () => {
      orbitSystem.removeEventListener("mousemove", handleMouseMove);
      orbitSystem.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="welcome" className="welcome-section">
      {/* Background Initials */}
      <div className="bg-initials" ref={bgInitialsRef}></div>

      {/* Intro Content */}
      <div className="intro-content">
        {/* Orbit System */}
        <div className="orbit-system" ref={orbitSystemRef}>
          {/* Orbits */}
          <div className="profile-orbit orbit-one"></div>
          <div className="profile-orbit orbit-two"></div>
          <div className="profile-orbit orbit-three"></div>

          {/* Central Logo */}
          <div className="central-logo">
            <img
              src={`${import.meta.env.BASE_URL}SP.png`}
              alt="Profile Logo"
              className="profile-logo"
            />
          </div>

          {/* Rotating Circles */}
          <div className="orbit-circle circle-one"></div>
          <div className="orbit-circle circle-two"></div>
          <div className="orbit-circle circle-three"></div>

          {/* Glow Effect */}
          <div id="orbit-glow"></div>
        </div>

        {/* Name and Tagline */}
        <div className="name-title">
          <h1 className="name">Soso Pkhakadze</h1>
          <div className="tagline-wrapper">
            <ReactTyped
              strings={[
                "Passionate Software Engineer",
                "Experienced Django Developer",
                "Enthusiastic Learner",
                "Creative Problem Solver",
              ]}
              typeSpeed={60}
              backSpeed={30}
              loop
              className="tagline"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;