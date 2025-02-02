import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Experience.css';

const Experience = () => {
  const [activeCompanyId, setActiveCompanyId] = useState('netex');
  const [logoAnimation, setLogoAnimation] = useState(null);

  const experienceData = [
    {
      id: 'netex',
      logo: 'public/netex.png',
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
      logo: 'public/devsdata.png',
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

  const handleCompanyClick = (companyId) => {
    setLogoAnimation({
      id: companyId,
      // Get coordinates relative to the viewport
      from: document.getElementById(`logo-${companyId}`).getBoundingClientRect(),
      to: document.querySelector('.company-logo-main').getBoundingClientRect(),
    });

    // Wait for the logo to travel up before switching
    setTimeout(() => {
      setActiveCompanyId(companyId);
      setLogoAnimation(null); // Reset for next animation
    }, 300);
  };

  return (
    <section className="experience-section" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="section-title">
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
                  {/* Hide logo on the right if it's traveling to the top */}
                  {logoAnimation?.id !== company.id && (
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
              animate={{
                x: logoAnimation.to.x,
                y: logoAnimation.to.y,
                width: logoAnimation.to.width,
                height: logoAnimation.to.height,
              }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;