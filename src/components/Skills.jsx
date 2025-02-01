import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillsData = {
    'Programming Languages': [
      'Python (Django, Pandas, BeautifulSoup, Pygame, NumPy, OpenCV, matplotlib)',
      'JavaScript (React)',
      'HTML',
      'CSS',
      'SQL',
      'C',
      'Java',
      'C# (Core)',
    ],
    'Data Analysis & Visualization': ['SQL', 'Power BI', 'Tableau', 'pandas', 'matplotlib'],
    'Databases': ['MySQL', 'MariaDB', 'SQLite'],
    'Version Control & Collaboration': ['Git', 'GitHub', 'Docker'],
    'Software Development': [
      'OOP',
      'Data Structures & Algorithms',
      'Testing & Debugging',
      'Agile Methodologies (Scrum basics)',
    ],
  };

  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="skills-container">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div className="skill-category" key={category}>
            <h3>{category}</h3>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;