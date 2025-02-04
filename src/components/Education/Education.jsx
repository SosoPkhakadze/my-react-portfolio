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
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Monitor,
} from 'lucide-react';
import './Education.css';
import kiuLogo from '../assets/KIU.png';

const courseIcons = {
  // Computer Science Icons
  'Numerical Programming': <Calculator strokeWidth={1.5} />,
  'Databases I': <Database strokeWidth={1.5} />,
  'Backend Development with Django': <Code strokeWidth={1.5} />,
  'Discrete Probability Theory': <PieChart strokeWidth={1.5} />,
  'Calculus I': <BookOpen strokeWidth={1.5} />,
  'Algorithms and Data Structures': <Layers strokeWidth={1.5} />,
  'Linear Algebra': <Share2 strokeWidth={1.5} />,
  'Computer Architecture': <Cpu strokeWidth={1.5} />,
  'Theory of Computation': <Zap strokeWidth={1.5} />,
  'Analysis for Informatics': <Calculator strokeWidth={1.5} />,
  'Discrete Structures': <Layers strokeWidth={1.5} />,
  'Principles of Operating Systems and System Software': (
    <Monitor strokeWidth={1.5} />
  ),
  'Software Engineering I': <Code strokeWidth={1.5} />,
  // Business and Management Icons
  'Entrepreneurial Business': <TrendingUp strokeWidth={1.5} />,
  'Management Science': <Users strokeWidth={1.5} />,
  'Principles of Project Management': <Calendar strokeWidth={1.5} />,
  'Human Resource Management & Leadership': <Users strokeWidth={1.5} />,
  'Marketing': <TrendingUp strokeWidth={1.5} />,
  'Financial Accounting': <DollarSign strokeWidth={1.5} />,
};

const educationData = {
  university: {
    degree: 'Bachelor of Computer Science',
    institution: 'Kutaisi International University',
    location: 'Kutaisi, Georgia',
    year: '2022 - 2026',
    completedCourses: {
      computerScience: [
        'Numerical Programming',
        'Databases I',
        'Backend Development with Django',
        'Discrete Probability Theory',
        'Calculus I',
        'Algorithms and Data Structures',
        'Linear Algebra',
        'Computer Architecture',
        'Theory of Computation',
        'Analysis for Informatics',
        'Discrete Structures',
        'Principles of Operating Systems and System Software',
        'Software Engineering I',
      ],
      businessAndManagement: [
        'Entrepreneurial Business',
        'Management Science',
        'Principles of Project Management',
        'Human Resource Management & Leadership',
        'Marketing',
        'Financial Accounting',
      ],
    },
    description:
      'Pursuing an innovative computer science degree with a comprehensive curriculum covering theoretical foundations and practical software engineering skills. I have chosen Business Administration as a minor to learn some practical knowledge of leading projects and creating startup.',
    achievements: [
      'Maintaining excellent academic standing',
      'Actively participating in advanced computer science coursework',
      'Developing strong programming and analytical skills',
    ],
  },
  onlineCourses: [
    {
      title: "CS50's Introduction to Computer Science",
      platform: 'HarvardX (via edX)',
      skills: ['Algorithms', 'Data Structures', 'C Programming'],
    },
    {
      title: "CS50's Introduction to Programming with Python",
      platform: 'HarvardX (via edX)',
      skills: ['Python Programming', 'Problem Solving'],
    },
    {
      title: "CS50's Web Programming with Python and JavaScript",
      platform: 'HarvardX (via edX)',
      skills: ['Web Development', 'Full-Stack Development'],
    },
    {
      title: 'Django Web Framework',
      platform: 'Coursera',
      skills: ['Django', 'Backend Development'],
    },
    {
      title: 'API Development',
      platform: 'Coursera',
      skills: ['API Design', 'Backend Integration'],
    },
  ],
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
  const csCourseContainerRef = useRef(null);
  const businessCourseContainerRef = useRef(null);
  const [isCsHovered, setIsCsHovered] = useState(false);
  const [isCsPressed, setIsCsPressed] = useState(false);
  const [isBusinessHovered, setIsBusinessHovered] = useState(false);
  const [isBusinessPressed, setIsBusinessPressed] = useState(false);

  useEffect(() => {
    const handleScrolling = (containerRef, isHovered, isPressed) => {
      const container = containerRef.current;
      let scrollInterval;

      const startScrolling = () => {
        scrollInterval = setInterval(() => {
          if (
            container.scrollLeft >=
            container.scrollWidth - container.clientWidth
          ) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft += 1;
          }
        }, 20);
      };

      const stopScrolling = () => {
        clearInterval(scrollInterval);
      };

      if (container && !isHovered && !isPressed) {
        startScrolling();
      } else {
        stopScrolling();
      }

      return () => clearInterval(scrollInterval);
    };

    const cleanupCS = handleScrolling(
      csCourseContainerRef,
      isCsHovered,
      isCsPressed
    );
    const cleanupBusiness = handleScrolling(
      businessCourseContainerRef,
      isBusinessHovered,
      isBusinessPressed
    );

    return () => {
      cleanupCS();
      cleanupBusiness();
    };
  }, [isCsHovered, isCsPressed, isBusinessHovered, isBusinessPressed]);

  return (
    <section id="education" className="education-section">
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

        {/* University Section */}
        {activeSection === 'university' && (
          <div className="university-section">
            <div className="university-details">
              <div className="university-card">
                <div className="university-header">
                  <a
                    href="https://www.kiu.edu.ge/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="university-logo-link"
                  >
                    <img
                      src={kiuLogo}
                      alt="KIU Logo"
                      className="university-logo"
                    />
                  </a>
                  <div className="university-header-text">
                    <h3>{educationData.university.degree}</h3>
                    <p>{educationData.university.institution}</p>
                  </div>
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

            {/* Completed Courses Card */}
            <div className="courses-showcase">
              <h4>Completed Courses</h4>
              <div className="courses-containers-wrapper">
                {/* Computer Science Courses Container */}
                <div className="course-section">
                  <div className="course-container-title">
                    <p>Computer Science:</p>
                  </div>
                  <div
                    className={`course-container ${
                      isCsHovered || isCsPressed ? 'static' : ''
                    }`}
                    ref={csCourseContainerRef}
                    onMouseEnter={() => setIsCsHovered(true)}
                    onMouseLeave={() => setIsCsHovered(false)}
                    onMouseDown={() => setIsCsPressed(true)}
                    onMouseUp={() => setIsCsPressed(false)}
                  >
                    {educationData.university.completedCourses.computerScience.map(
                      (course, index) => (
                        <CourseTag key={index} course={course} />
                      )
                    )}
                  </div>
                </div>

                {/* Business and Management Courses Container */}
                <div className="course-section">
                  <div className="course-container-title">
                    <p>Business and Management:</p>
                  </div>
                  <div
                    className={`course-container ${
                      isBusinessHovered || isBusinessPressed ? 'static' : ''
                    }`}
                    ref={businessCourseContainerRef}
                    onMouseEnter={() => setIsBusinessHovered(true)}
                    onMouseLeave={() => setIsBusinessHovered(false)}
                    onMouseDown={() => setIsBusinessPressed(true)}
                    onMouseUp={() => setIsBusinessPressed(false)}
                  >
                    {educationData.university.completedCourses.businessAndManagement.map(
                      (course, index) => (
                        <CourseTag key={index} course={course} />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Online Courses Section */}
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