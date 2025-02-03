import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Experience.css';

import {useAnimationControls } from 'framer-motion';

  const Experience = () => {
    const controls = useAnimationControls(); // Initialize animation controls

  const [activeCompanyId, setActiveCompanyId] = useState('netex');
  const [logoAnimation, setLogoAnimation] = useState(null);

  const experienceData = [
    {
      id: 'netex',
      logo: 'netex.png',
      alt: 'Netex Consulting LLC',
      title: 'Data Engineer & AI Training Support Specialist',
      duration: 'Apr 2022 - Aug 2023',
      description: [
        'Led data preparation for a large-scale AI training initiative, annotating over 300,000 thermal and standard images.',
        'Enhanced object detection algorithms for livestock monitoring.',
        'Optimized environmental data reporting and resource allocation.',
        'Collaborated with a distributed team, ensuring 99% data annotation accuracy.',
      ],
    },
    {
      id: 'devsdata',
      logo: 'devsdata.png',
      alt: 'DevsData',
      title: 'QA Engineer',
      duration: 'Jul 2024 - Present',
      description: [
        'Conducted in-depth QA for backend functionalities across Python and JavaScript applications.',
        'Identified issues early to ensure 100% reliable deployment.',
        'Reduced manual testing time by 80% through automated test scripts.',
        'Ensured frontend deployment integrity and grammatical accuracy in published articles.',
      ],
    },
  ];

  const activeCompany = experienceData.find((company) => company.id === activeCompanyId);

    // Update handleCompanyClick to include return animation
  const handleCompanyClick = (companyId) => {
    // Get coordinates relative to the viewport
    const fromCoords = document.getElementById(`logo-${companyId}`).getBoundingClientRect();
    const toCoords = document.querySelector('.company-logo-main').getBoundingClientRect();

    // Animation for moving the logo to the active slot
    setLogoAnimation({
      id: companyId,
      from: fromCoords,
      to: toCoords,
      isReturning: false,
    });

    // Animate the move up to the active slot
    controls.start({
      x: toCoords.x - fromCoords.x,
      y: toCoords.y - fromCoords.y,
      width: toCoords.width,
      height: toCoords.height,
      transition: { duration: 0.3, ease: "easeInOut" },
    }).then(() => {
      // Once the logo has moved up, switch the active company id
      setActiveCompanyId(companyId);

      // Get coordinates for the return trip
      const returnFromCoords = document.querySelector('.company-logo-main').getBoundingClientRect();
      const returnToCoords = document.getElementById(`logo-${companyId}`).getBoundingClientRect();

      // Reset position to start from the top
      controls.set({
        x: 0,
        y: 0,
        width: returnFromCoords.width,
        height: returnFromCoords.height,
      });

      // Animation for moving the logo back to its original slot
      setLogoAnimation({
        id: companyId,
        from: returnFromCoords,
        to: returnToCoords,
        isReturning: true,
      });

      // Animate the return to the original position
      controls.start({
        x: returnToCoords.x - returnFromCoords.x,
        y: returnToCoords.y - returnFromCoords.y,
        width: returnToCoords.width,
        height: returnToCoords.height,
        transition: { duration: 0.3, ease: "easeInOut" },
      }).then(() => {
        // After the animation completes, reset the animation state
        setLogoAnimation(null);
      });
    });
  };

  return (
    <section className="experience-section" aria-labelledby="experience-heading">
      <h2 id="experience" className="section-title">
        Professional Experience
      </h2>
      <div className="experience-container">
        {/* Left Side: Experience Info Card with Logo Holder */}
        <motion.div
          className="experience-info-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="company-logo-main">
            <AnimatePresence initial={false}>
              <motion.img
                key={activeCompanyId}
                src={activeCompany.logo}
                alt={activeCompany.alt}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
          </div>

          <div className="experience-info">
            <h3>{activeCompany.title}</h3>
            <h4>{activeCompany.alt}</h4>
            <h5>{activeCompany.duration}</h5>
            <ul>
              {activeCompany.description.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right Side: Company Logos and Position Names in a Card */}
        <div className="company-logos-card">
          {experienceData.map((company) => (
            <motion.div
              key={company.id}
              className={`company-logo-wrapper ${activeCompanyId === company.id ? 'active' : ''
                }`}
              onClick={() => handleCompanyClick(company.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="company-logo" id={`logo-${company.id}`}>
                <AnimatePresence>
                  {/* Render the company logo if not actively animating or if it's the one returning */}
                  {(logoAnimation === null || (logoAnimation.id !== company.id || logoAnimation.isReturning)) && (
                    <motion.img
                      key={company.id}
                      src={company.logo}
                      alt={company.alt}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </div>
              <div className="company-title">{company.title}</div>
            </motion.div>
          ))}

          {/* Logo Animation */}
          {logoAnimation && (
            <motion.img
              className="traveling-logo"
              src={experienceData.find((c) => c.id === logoAnimation.id).logo}
              alt={experienceData.find((c) => c.id === logoAnimation.id).alt}
              initial={{
                x: logoAnimation.from.x,
                y: logoAnimation.from.y,
                width: logoAnimation.from.width,
                height: logoAnimation.from.height,
              }}
              animate={controls} // Use animation controls for the animation
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;