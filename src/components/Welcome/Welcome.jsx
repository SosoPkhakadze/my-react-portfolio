// Welcome.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Welcome.css";
import { ReactTyped } from "react-typed";

const Welcome = () => {
  const orbitSystemRef = useRef(null);
  const bgInitialsRef = useRef(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const pdfPath = `${import.meta.env.BASE_URL}Soso Pkhakarde CV.pdf`;  // Correct path

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

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

  return (
    <section id="welcome" className="welcome-section">
      {/* Background Initials */}
      <div className="bg-initials" ref={bgInitialsRef}></div>

      {/* Intro Content with Transparent Card */}
      <div className="intro-content">
        <div className="transparent-card">
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
            {/* View Resume Button */}
            <button onClick={openModal} className="download-button">
              View Resume
            </button>

          </div>
        </div>
      </div>
          {/* PDF Modal */}
          {showModal && (
    <div className="modal-backdrop" onClick={closeModal}>
        <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>×</span>
            <object data={pdfPath} type="application/pdf" width="100%" height="100%">
                <div style={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%'
                }}>
                    <img 
                        src={`${import.meta.env.BASE_URL}Soso Pkhakarde CV.png`} 
                        alt="Resume" 
                        style={{
                            maxWidth: '100%', 
                            maxHeight: '80%', 
                            objectFit: 'contain'
                        }} 
                    />
                    <a 
                        href={pdfPath} 
                        download="Soso_Pkhakadze_CV.pdf" 
                        className="download-button"
                        style={{
                            marginTop: '20px',
                            textDecoration: 'none',
                            textAlign: 'center'
                        }}
                    >
                        Download PDF
                    </a>
                </div>
            </object>
        </div>
    </div>
)}

        {/* Fallback for no JavaScript */}
        <noscript>
            <p>
                Please enable JavaScript to view this website properly.  You can view my resume <a href={pdfPath} target="_blank" rel="noopener noreferrer">here</a>.
            </p>
        </noscript>

    </section>
  );
};

export default Welcome;