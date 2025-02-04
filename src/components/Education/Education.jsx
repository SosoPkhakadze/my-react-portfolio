import React, { useState, useRef, useEffect } from 'react';
import { 
  GraduationCap, 
  Code, 
  Database, 
  Cpu, 
  PieChart, 
  BookOpen, 
  Layers, 
  Calculator, 
  Share2,
  Zap,
  MapPin,
  Calendar
} from 'lucide-react';
import './Education.css';

const courseIcons = {
  'Numerical Programming': <Calculator strokeWidth={1.5} />,
  'Databases I': <Database strokeWidth={1.5} />,
  'Backend Programming with Django': <Code strokeWidth={1.5} />,
  'Discrete Probability Theory': <PieChart strokeWidth={1.5} />,
  'Calculus I': <BookOpen strokeWidth={1.5} />,
  'Algorithms and Data Structures': <Layers strokeWidth={1.5} />,
  'Linear Algebra': <Share2 strokeWidth={1.5} />,
  'Computer Architecture': <Cpu strokeWidth={1.5} />,
  'Theory of Computation': <Zap strokeWidth={1.5} />
};

const educationData = {
  university: {
    degree: 'Bachelor of Computer Science',
    institution: 'Kutaisi International University',
    location: 'Kutaisi, Georgia',
    year: '2022 - 2026',
    completedCourses: [
      'Numerical Programming',
      'Databases I',
      'Backend Programming with Django',
      'Discrete Probability Theory',
      'Calculus I',
      'Algorithms and Data Structures',
      'Linear Algebra',
      'Computer Architecture',
      'Theory of Computation'
    ],
    description: 'Pursuing an innovative computer science degree with a comprehensive curriculum covering theoretical foundations and practical software engineering skills.',
    achievements: [
      'Maintaining excellent academic standing',
      'Actively participating in advanced computer science coursework',
      'Developing strong programming and analytical skills'
    ]
  },
  onlineCourses: [
    {
      title: 'CS50\'s Introduction to Computer Science',
      platform: 'HarvardX (via edX)',
      skills: ['Algorithms', 'Data Structures', 'C Programming']
    },
    {
      title: 'CS50\'s Introduction to Programming with Python',
      platform: 'HarvardX (via edX)',
      skills: ['Python Programming', 'Problem Solving']
    },
    {
      title: 'CS50\'s Web Programming with Python and JavaScript',
      platform: 'HarvardX (via edX)',
      skills: ['Web Development', 'Full-Stack Development']
    },
    {
      title: 'Django Web Framework',
      platform: 'Coursera',
      skills: ['Django', 'Backend Development']
    },
    {
      title: 'API Development',
      platform: 'Coursera',
      skills: ['API Design', 'Backend Integration']
    }
  ]
};

const CourseTag = ({ course }) => {
  const Icon = courseIcons[course];
  
  return (
    <div className="course-tag">
      {Icon && <span className="course-tag-icon">{Icon}</span>}
      <span className="course-tag-text">{course}</span>
    </div>
  );
};

const Education = () => {
  const [activeSection, setActiveSection] = useState('university');
  const courseContainerRef = useRef(null);

  useEffect(() => {
    const container = courseContainerRef.current;
    if (container) {
      const scrollInterval = setInterval(() => {
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1;
        }
      }, 20);

      return () => clearInterval(scrollInterval);
    }
  }, []);

  return (
    <section id="education" className="advanced-education-section">
      <div className="education-content">
        <div className="education-header">
          <h2 className="section-title">
            <GraduationCap size={40} /> Educational Odyssey
          </h2>
          <div className="section-toggle">
            <button 
              className={activeSection === 'university' ? 'active' : ''}
              onClick={() => setActiveSection('university')}
            >
              University
            </button>
            <button 
              className={activeSection === 'online' ? 'active' : ''}
              onClick={() => setActiveSection('online')}
            >
              Online Courses
            </button>
          </div>
        </div>

        {activeSection === 'university' && (
          <div className="university-section">
            <div className="university-details">
              <div className="university-card">
                <div className="university-header">
                  <h3>{educationData.university.degree}</h3>
                  <p>{educationData.university.institution}</p>
                </div>
                <div className="university-info">
                  <div className="university-meta">
                    <span className="location">
                      <MapPin size={16} /> {educationData.university.location}
                    </span>
                    <span className="year">
                      <Calendar size={16} /> {educationData.university.year}
                    </span>
                  </div>
                  <p className="description">
                    {educationData.university.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="courses-showcase">
              <h4>Completed Courses</h4>
              <div 
                className="course-container" 
                ref={courseContainerRef}
              >
                {educationData.university.completedCourses.map((course, index) => (
                  <CourseTag key={index} course={course} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'online' && (
          <div className="online-courses-section">
            <div className="online-courses-grid">
              {educationData.onlineCourses.map((course, index) => (
                <div key={index} className="online-course-card">
                  <div className="course-icon">
                    <BookOpen />
                  </div>
                  <div className="course-details">
                    <h3>{course.title}</h3>
                    <p className="platform">{course.platform}</p>
                    <div className="course-skills">
                      {course.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="skill-badge">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;