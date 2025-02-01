import React from 'react';
import './Skills.css';

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <h2>Skills</h2>
      <div className="skills-grid">
        <div className="skill-card">
          <h3>Skill 1</h3>
          <p>Description of Skill 1.</p>
        </div>
        <div className="skill-card">
          <h3>Skill 2</h3>
          <p>Description of Skill 2.</p>
        </div>
      </div>
    </section>
  );
};

export default Skills;