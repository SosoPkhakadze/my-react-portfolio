// src/components/Projects/ProjectModal.js
import React, { useState, useEffect } from "react";
import "./ProjectModal.css";

const ProjectModal = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    let interval = null;

    // Automatic image switching (if there are images)
    if (project.images && project.images.length > 1) {
      interval = setInterval(() => {
        setActiveImageIndex((prevIndex) =>
          prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [project, activeImageIndex]);

  const handlePrevImage = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2 className="modal-title">{project.title}</h2>

        {/* Image Carousel */}
        {project.images && project.images.length > 0 && (
          <div className="modal-image-carousel-container">
            <button
              className="carousel-control prev"
              onClick={handlePrevImage}
              disabled={project.images.length <= 1}
            >
              &lt;
            </button>
            <div className="modal-image-carousel">
              {project.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${project.title} ${index + 1}`}
                  className={`modal-image ${
                    index === activeImageIndex ? "active" : ""
                  }`}
                />
              ))}
            </div>
            <button
              className="carousel-control next"
              onClick={handleNextImage}
              disabled={project.images.length <= 1}
            >
              &gt;
            </button>
          </div>
        )}

        {/* Text and Technologies */}
        <p className="modal-description">{project.description}</p>
        <div className="modal-technologies">
          {project.technologies.map((tech) => (
            <span key={tech} className="modal-tech">
              {tech}
            </span>
          ))}
        </div>

        {/* GitHub Button */}
        <div className="modal-buttons">
  {project.githubLink && (
    <a
      href={project.githubLink}
      target="_blank"
      rel="noopener noreferrer"
      className="modal-button"
    >
      GitHub
    </a>
  )}
  {project.liveLink && ( 
    <a
      href={project.liveLink}
      target="_blank"
      rel="noopener noreferrer"
      className="modal-button"
    >
      Live Demo 
    </a>
  )}
</div>
      </div>
    </div>
  );
};

export default ProjectModal;