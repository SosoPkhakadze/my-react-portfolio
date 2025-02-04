import React, { useState, useEffect, useRef } from "react";
import ProjectModal from "./ProjectModal";
import "./Projects.css";
import projectsData from "./projectsData";
import githubLogoLight from "../assets/github-mark.png";
import githubLogoDark from "../assets/github-mark-white.png";

const Projects = ({ isDarkMode }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Drag functionality states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragX, setDragX] = useState(0);
  const trackRef = useRef(null);

  const openModal = (project) => {
    // Only open modal if we haven't dragged
    if (!isDragging) {
      setSelectedProject(project);
    }
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setActiveIndex(0);
  };

  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((project) => project.filter.includes(activeFilter));

  const githubLogo = isDarkMode ? githubLogoDark : githubLogoLight;

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((current) => (current + 1) % filteredProjects.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((current) =>
        current === 0 ? filteredProjects.length - 1 : current - 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - dragX);
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.pageX - startX;
    setDragX(currentX);

    // Determine if we should change slides based on drag distance
    if (Math.abs(currentX) > 100) {
      if (currentX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      // Reset drag state
      setIsDragging(false);
      setDragX(0);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragX(0);
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
    }
  };

  // Clean up mouse events
  useEffect(() => {
    const cleanup = () => {
      setIsDragging(false);
      setDragX(0);
    };

    document.addEventListener('mouseup', cleanup);
    return () => {
      document.removeEventListener('mouseup', cleanup);
    };
  }, []);

  const getVisibleCards = () => {
    const numProjects = filteredProjects.length;
  if (numProjects === 0) {
    return []; // Return empty array if no projects match the filter
  }

  if (numProjects === 1) {
    return [{
      project: filteredProjects[0],
      position: 0 // Only center position is needed
    }];
  }

  if (numProjects === 2) {
    return [
      {
        project: filteredProjects[activeIndex],
        position: 0 // Center position
      },
      {
        project: filteredProjects[(activeIndex + 1) % 2], // The other project will be positioned according to current activeIndex
        position: activeIndex === 0 ? 1 : -1
      }
    ];
  }

  // For three or more projects, your original logic is fine:
  const cards = [];
  for (let i = -1; i <= 1; i++) {
    let index = activeIndex + i;
    if (index < 0) index = numProjects - 1;
    if (index >= numProjects) index = 0;
    cards.push({
      project: filteredProjects[index],
      position: i
    });
  }
  return cards;
};

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Projects</h2>
      <div className="filter-container">
        <div className="filter-dropdown">
          <button id="filterBtn" className="filter-btn">
            <span>Filter by Technology</span>
            <svg
              className="filter-icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6h18M6 12h12m-9 6h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div id="filterDropdown" className="filter-dropdown-content">
            <a
              href="#projects"
              data-filter="all"
              className={activeFilter === "all" ? "active" : ""}
              onClick={() => handleFilterClick("all")}
            >
              All
            </a>
            <a
              href="#projects"
              data-filter="python"
              className={activeFilter === "python" ? "active" : ""}
              onClick={() => handleFilterClick("python")}
            >
              Python
            </a>
            <a
              href="#projects"
              data-filter="tabi"
              className={activeFilter === "tabi" ? "active" : ""}
              onClick={() => handleFilterClick("tabi")}
            >
              Power BI/Tableau
            </a>
            <a
              href="#projects"
              data-filter="bases"
              className={activeFilter === "bases" ? "active" : ""}
              onClick={() => handleFilterClick("bases")}
            >
              MySQL/MariaDB
            </a>
            <a
              href="#projects"
              data-filter="django"
              className={activeFilter === "django" ? "active" : ""}
              onClick={() => handleFilterClick("django")}
            >
              Django
            </a>
            <a
              href="#projects"
              data-filter="react"
              className={activeFilter === "react" ? "active" : ""}
              onClick={() => handleFilterClick("react")}
            >
              React
            </a>
          </div>
        </div>
      </div>

      <div className="carousel-container">
        <button className="carousel-button prev" onClick={prevSlide}>
          &#8249;
        </button>
        <div 
          ref={trackRef}
          className={`carousel-track ${isDragging ? 'dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {getVisibleCards().map(({ project, position }) => (
            <div
              className={`project-card carousel-card position-${position}`}
              key={project.id}
              style={{
                transform: `
                  ${position === 0 
                    ? `translateX(${dragX}px) translateY(-20px)` 
                    : position === 1 
                    ? `translateX(calc(100% + 2rem + ${dragX}px)) translateY(0) rotateY(-10deg)` 
                    : `translateX(calc(-100% - 2rem + ${dragX}px)) translateY(0) rotateY(10deg)`
                  }
                `
              }}
            >
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  <img
                    src={githubLogo}
                    alt="GitHub Repo"
                    className="github-logo"
                  />
                </a>
              )}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-short-description">
                {project.shortDescription}
              </p>
              <div className="project-technologies">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech">
                    {tech}
                  </span>
                ))}
              </div>
              <button className="view-button" onClick={() => openModal(project)}>
                View
              </button>
            </div>
          ))}
        </div>
        <button className="carousel-button next" onClick={nextSlide}>
          &#8250;
        </button>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </section>
  );
};

export default Projects;