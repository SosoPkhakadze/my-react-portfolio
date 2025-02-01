import React from 'react';
import './Projects.css';

const ProjectItem = ({ title, description }) => {
  return (
    <div className="project-item">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Projects = () => {
  const projectsData = [
    {
      title: 'Job Aggregator Website (Django - React)',
      description:
        'Developed a full-stack job search platform that allows users to search for job listings by title and location, with 100% accuracy in search filters. Integrated with an external API and implemented advanced filtering options, leading to 35% faster retrieval of relevant results compared to standard search methods.',
    },
    {
      title: 'Image Resizing & Interpolation (Python, Matplotlib)',
      description:
        'Built an image resizing application from scratch using bilinear and bicubic interpolation techniques, without relying on built-in libraries. This project showcases image processing fundamentals and displays results through Matplotlib for visualization, highlighting skills in both algorithmic development and data visualization.',
    },
    {
      title: 'Price Comparison (Django - BeautifulSoup)',
      description:
        'Created a price comparison web application by integrating web scraping scripts (BeautifulSoup) with Django to pull live data from 5+ e-commerce sites. Implemented price tracking and notifications, giving users real-time price updates and insights.',
    },
    {
      title: 'Weather Forecast (Django)',
      description:
        'Developed a weather forecast application that pulls data from the OpenWeatherMap API. Designed backend functionality, handling 500+ API requests, and displaying accurate, location-based weather updates.',
    },
  ];

  return (
    <section id="projects">
      <h2>Projects</h2>
      {projectsData.map((project, index) => (
        <ProjectItem key={index} {...project} />
      ))}
    </section>
  );
};

export default Projects;