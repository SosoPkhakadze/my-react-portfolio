import React, { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";
import "./Projects.css";
import projectsData from "./projectsData";
import githubLogoLight from "../assets/github-mark.png";
import githubLogoDark from "../assets/github-mark-white.png";

const Projects = ({ isDarkMode }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((project) => project.filter.includes(activeFilter));

  const githubLogo = isDarkMode ? githubLogoDark : githubLogoLight;

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

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div className="project-card" key={project.id}>
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

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </section>
  );
};

export default Projects;