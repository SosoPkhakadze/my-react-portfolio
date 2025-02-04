import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCode, FaDatabase, FaChartBar, FaReact, FaTools,
    FaFilter, FaSearch, FaArrowUp
} from 'react-icons/fa';
import "./Skills.css";
import projectsData from '../Projects/projectsData'; // Assuming this is the correct path

const skillCategories = {
    'All Skills': [
        {
            name: 'Python',
            category: 'Programming Languages',
            level: 'Advanced',
            icon: FaCode,
            projects: ['k-line-data-analysis', 'search-products', 'weather-forecast', 'image-resizing', 'price-comparison']
        },
        {
            name: 'React',
            category: 'Frontend',
            level: 'Advanced',
            icon: FaReact,
            projects: ['job-aggregator']
        },
        {
            name: 'Docker',
            category: 'DevOps',
            level: 'Intermediate',
            icon: FaTools,
            other: 'Highly skilled in containerization, enhancing deployment efficiency and application scalability.'
        },
        {
            name: 'MySQL',
            category: 'Databases',
            level: 'Intermediate',
            icon: FaDatabase,
            projects: ['data-analysis-dashboard']
        },
        {
            name: 'Data Analysis',
            category: 'Data Science',
            level: 'Advanced',
            icon: FaChartBar,
            projects: ['k-line-data-analysis', 'sales-dashboard', 'covid-insight-analysis']
        },
        {
            name: 'Django',
            category: 'Backend',
            level: 'Advanced',
            icon: FaCode, // Consider a different icon for Django, like a server icon
            projects: ['weather-forecast', 'job-aggregator', 'price-comparison']
        },
        {
            name: 'Power BI',
            category: 'Data Visualization',
            level: 'Advanced',
            icon: FaChartBar,
            projects: ['sales-dashboard', 'data-analysis-dashboard', 'covid-insight-analysis']
        },
        {
            name: 'Tableau',
            category: 'Data Visualization',
            level: 'Intermediate',
            icon: FaChartBar,
            projects: ['user-requirements-analysis']
        }
    ]
};

const Skills = () => {
    const [activeFilters, setActiveFilters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showScrollButton, setShowScrollButton] = useState(false);
    const skillsSectionRef = useRef(null); // Ref for the skills section

    const filterCategories = [
        { name: 'Programming Languages', icon: FaCode },
        { name: 'Frontend', icon: FaReact },
        { name: 'Databases', icon: FaDatabase },
        { name: 'DevOps', icon: FaTools },
        { name: 'Data Science', icon: FaChartBar },
        { name: 'Backend', icon: FaCode }, // Might need a better icon
        { name: 'Data Visualization', icon: FaChartBar }
    ];

    const filteredSkills = useMemo(() => {
        return skillCategories['All Skills'].filter(skill => {
            const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilters = activeFilters.length === 0 ||
                activeFilters.includes(skill.category);
            return matchesSearch && matchesFilters;
        });
    }, [searchTerm, activeFilters]);

    const toggleFilter = (category) => {
        setActiveFilters(prev =>
            prev.includes(category)
                ? prev.filter(f => f !== category)
                : [...prev, category]
        );
    };

    // Scroll to top functionality
    const scrollToTop = () => {
        skillsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="skills" className="skills-section" ref={skillsSectionRef}>
            <h2 className="section-title">
                       Skills
                    </h2>
            <div className="skills-control-panel">
                <motion.div
                    className="search-wrapper"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Explore Skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </motion.div>
                
                <div className="filter-section">
                    <div className="filter-header">
                    
                        <FaFilter />
                        <span>Skill Filters</span>
                    </div>
                    <div className="filter-buttons">
                        {filterCategories.map(category => (
                            <motion.button
                                key={category.name}
                                className={`filter-btn ${activeFilters.includes(category.name) ? 'active' : ''}`}
                                onClick={() => toggleFilter(category.name)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <category.icon />
                                {category.name}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* REMOVE View Functionality */}
            </div>

            <motion.div
                className="skills-showcase grid-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <AnimatePresence>
                    {filteredSkills.map(skill => (
                        <motion.div
                            key={skill.name}
                            className="skill-card"
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="skill-card-header">
                                <skill.icon className="skill-icon" />
                                <h3>{skill.name}</h3>
                                <span className="skill-category">{skill.category}</span>
                            </div>
                            <div className="skill-card-details">
                                {skill.level && (
                                    <div className="skill-level">
                                        <span>Level:</span>
                                        <span className="level-text">{skill.level}</span>
                                    </div>
                                )}
                                {skill.projects && (
                                    <div className="skill-projects">
                                        <h4>Featured Projects:</h4>
                                        <div className="project-tags">
                                            {skill.projects.map(projectId => {
                                                const project = projectsData.find(p => p.id === projectId);
                                                return project ? (
                                                    <a href={project.githubLink} key={projectId} className="project-tag" target="_blank" rel="noopener noreferrer">
                                                        {project.title}
                                                    </a>
                                                ) : null;
                                            })}
                                        </div>
                                    </div>
                                )}
                                {skill.other && (
                                    <div className="skill-other">
                                        <h4>Additional Expertise:</h4>
                                        <p>{skill.other}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollButton && (
                    <motion.div
                        className="scroll-to-top-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <motion.button
                            className="scroll-to-top"
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaArrowUp />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Skills;