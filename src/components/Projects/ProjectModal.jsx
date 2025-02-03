import React from "react";
import "./ProjectModal.css";
import project1Image from "../assets/project1-1.jpg";
const ProjectModal = ({ project, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-button" onClick={onClose}>
                    X
                </button>
                <h2 className="modal-title">{project.title}</h2>

                {project.id === "k-line-data-analysis" && (
                    <div className="modal-image">
                        <img
                            src={project1Image}
                            alt={`${project.title}`}
                        />
                    </div>
                )}
                <p className="modal-description">{project.description}</p>

                <div className="modal-buttons">
                    {" "}
                    {/* Container for buttons */}
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
                    {/* Add more buttons here if you have live links, etc. */}
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;