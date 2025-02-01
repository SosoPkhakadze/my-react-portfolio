import React from 'react';
import './Education.css';

const EducationItem = ({ degree, university, date, coursework }) => {
  return (
    <div className="education-item">
      <h3>{degree}</h3>
      <h4>{university}</h4>
      <p className="date">{date}</p>
      {coursework && (
        <div>
          <p className='coursework-title'>Relevant Coursework:</p>
          <ul>
            {coursework.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Education = () => {
  const educationData = [
    {
      degree: 'Bachelor in Computer Science',
      university: 'Kutaisi International University',
      date: '2022-2026',
      coursework: [
        "CS50's Introduction to Computer Science - HarvardX (via edX)",
        "CS50's Introduction to Programming with Python - HarvardX (via edX)",
        "CS50's Web Programming with Python and JavaScript - HarvardX (via edX)",
        "Django Web Framework - Coursera",
      ],
    },
  ];

  return (
    <section id="education">
      <h2>Education</h2>
      {educationData.map((edu, index) => (
        <EducationItem key={index} {...edu} />
      ))}
    </section>
  );
};

export default Education;