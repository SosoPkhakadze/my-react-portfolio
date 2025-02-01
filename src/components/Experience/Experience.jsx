import React, { useEffect } from 'react';
import './Experience.css';

const Experience = () => {
  useEffect(() => {
    const companyLogos = document.querySelectorAll('.company-logo');
    const experienceItems = document.querySelectorAll('.experience-item');

    companyLogos.forEach(logo => {
      logo.addEventListener('click', () => {
        companyLogos.forEach(l => l.classList.remove('active'));
        experienceItems.forEach(item => item.classList.remove('active'));

        logo.classList.add('active');
        const companyId = logo.dataset.company;
        document.getElementById(`${companyId}-info`).classList.add('active');

        const colorThief = new ColorThief();
        const img = logo;

        if (img.complete) {
          const dominantColor = colorThief.getColor(img);
          updateExperienceContainerStyle(dominantColor);
        } else {
          img.addEventListener('load', function() {
            const dominantColor = colorThief.getColor(img);
            updateExperienceContainerStyle(dominantColor);
          });
        }
      });
    });

    const updateExperienceContainerStyle = (color) => {
      const experienceInfo = document.querySelector('.experience-info');
      experienceInfo.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.15)`;

      const activeItem = document.querySelector('.experience-item.active');
      activeItem.style.borderLeft = `4px solid rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.8)`;
    };
  }, []);

  return (
    <section id="experience" className="experience-section">
      <h2>Experience</h2>
      <div className="experience-container">
        <div className="company-logos">
          <div className="company-logo active" data-company="company1">
            <img src="/devsdata.png" alt="Company 1" />
          </div>
          <div className="company-logo" data-company="company2">
            <img src="/netex.png" alt="Company 2" />
          </div>
        </div>
        <div className="experience-info">
          <div id="company1-info" className="experience-item active">
            <h3>Company 1</h3>
            <p>Details about your experience at Company 1.</p>
          </div>
          <div id="company2-info" className="experience-item">
            <h3>Company 2</h3>
            <p>Details about your experience at Company 2.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;