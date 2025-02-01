import React from 'react';
import './Education.css';

const Education = () => {
  return (
    <section id="education" className="education-section">
      <h2>Education</h2>
      <div className="education-grid">
        <div className="education-card">
          <h3>Degree 1</h3>
          <p>Description of Degree 1.</p>
        </div>
        <div className="education-card">
          <h3>Degree 2</h3>
          <p>Description of Degree 2.</p>
        </div>
      </div>
    </section>
  );
};

export default Education;