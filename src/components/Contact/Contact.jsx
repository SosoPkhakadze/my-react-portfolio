import React, { useState, useRef, useEffect } from 'react';
import { 
  LinkedinIcon, 
  GithubIcon, 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon, 
  CopyIcon, 
  CheckIcon,
  SendIcon,
  CodeIcon,
  NetworkIcon,
  ZapIcon
} from 'lucide-react';
import './Contact.css';

const ContactCard = ({ 
  icon: Icon, 
  title, 
  content, 
  copyContent, 
  isDarkMode,
  animationDelay 
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), animationDelay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [animationDelay]);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyContent || content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div 
      ref={cardRef}
      className={`contact-morphic-card ${isVisible ? 'visible' : ''} ${isCopied ? 'copied' : ''}`}
    >
      <div className="contact-morphic-card-content">
        <div className="contact-morphic-icon-wrapper">
          <Icon className="contact-morphic-icon" />
        </div>
        <div className="contact-morphic-details">
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
        {copyContent && (
          <button 
            className="contact-copy-button"
            onClick={handleCopy}
          >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </button>
        )}
      </div>
      <div className="contact-morphic-hover-effect"></div>
    </div>
  );
};

const Contact = ({ isDarkMode }) => {
  const contactData = {
    email: 'sosiko2004@gmail.com',
    phone: '+995 591 917 197',
    linkedin: 'https://www.linkedin.com/in/soso-pkhakadze-733428274/',
    github: 'https://github.com/SosoPkhakadze',
    location: 'Kutaisi, Georgia'
  };

  const contactInteractions = [
    {
      icon: MailIcon,
      title: 'Digital Communication',
      description: 'Professional email gateway',
      action: () => window.location.href = `mailto:${contactData.email}`
    },
    {
      icon: NetworkIcon,
      title: 'Professional Network',
      description: 'LinkedIn connection',
      action: () => window.open(contactData.linkedin, '_blank')
    },
    {
      icon: CodeIcon,
      title: 'Technical Portfolio',
      description: 'GitHub project showcase',
      action: () => window.open(contactData.github, '_blank')
    }
  ];

  const [activeInteraction, setActiveInteraction] = useState(null);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-content-wrapper">
        <div className="contact-header">
          <h2 className="section-title">Connect & Innovate</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info-column">
            <ContactCard 
              icon={MailIcon}
              title="Email Address"
              content={contactData.email}
              copyContent={contactData.email}
              isDarkMode={isDarkMode}
              animationDelay={100}
            />
            <ContactCard 
              icon={PhoneIcon}
              title="Contact Number"
              content={contactData.phone}
              copyContent={contactData.phone}
              isDarkMode={isDarkMode}
              animationDelay={300}
            />
            <ContactCard 
              icon={MapPinIcon}
              title="Current Location"
              content={contactData.location}
              isDarkMode={isDarkMode}
              animationDelay={500}
            />
          </div>

          <div className="contact-interaction-column">
            {contactInteractions.map((interaction, index) => (
              <div 
                key={index}
                className={`interaction-portal ${activeInteraction === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveInteraction(index)}
                onMouseLeave={() => setActiveInteraction(null)}
                onClick={interaction.action}
              >
                <div className="interaction-portal-content">
                  <div className="interaction-icon">
                    <interaction.icon />
                  </div>
                  <div className="interaction-details">
                    <h3>{interaction.title}</h3>
                    <p>{interaction.description}</p>
                  </div>
                </div>
                <div className="interaction-portal-overlay"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;