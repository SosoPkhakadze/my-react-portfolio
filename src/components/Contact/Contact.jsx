import React from 'react';
import './Contact.css';
import { LinkedinIcon, GithubIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

const Contact = ({ isDarkMode }) => {
  const contactEmail = 'sosiko2004@gmail.com';
  const phoneNumber = '+995 591 917 197';
  const linkedInProfile = 'https://www.linkedin.com/in/soso-pkhakadze-733428274/';
  const githubProfile = 'https://github.com/SosoPkhakadze';
  const location = 'Kutaisi, Georgia';

  const openEmailClient = () => {
    window.location.href = `mailto:${contactEmail}`;
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-detail">
            <MailIcon className="contact-icon" />
            <div>
              <h3>Email</h3>
              <p>{contactEmail}</p>
            </div>
          </div>
          <div className="contact-detail">
            <PhoneIcon className="contact-icon" />
            <div>
              <h3>Phone</h3>
              <p>{phoneNumber}</p>
            </div>
          </div>
          <div className="contact-detail">
            <MapPinIcon className="contact-icon" />
            <div>
              <h3>Location</h3>
              <p>{location}</p>
            </div>
          </div>
        </div>
        
        <div className="contact-actions">
          <button 
            className="contact-email-btn" 
            onClick={openEmailClient}
          >
            <MailIcon className="btn-icon" />
            Send an Email
          </button>
          
          <div className="social-links">
            <a 
              href={linkedInProfile} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
            >
              <LinkedinIcon className="social-icon" />
            </a>
            <a 
              href={githubProfile} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
            >
              <GithubIcon className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;