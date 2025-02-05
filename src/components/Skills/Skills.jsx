import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCode, FaDatabase, FaChartBar, FaReact, FaTools,
    FaFilter, FaSearch, FaArrowUp, FaGit, FaGithub
} from 'react-icons/fa';
import {
    SiPython, SiJavascript, SiHtml5, SiCss3, SiMysql,
    SiMariadb, SiSqlite, SiTableau, SiDjango, SiDocker,
    SiDotnet, SiC
} from 'react-icons/si';

import "./Skills.css";
import projectsData from '../Projects/projectsData';

const skillCategories = {
    'All Skills': [
        // Programming Languages
        {
            name: 'Python',
            category: ['Programming Languages'],
            level: 'Advanced',
            icon: SiPython,
            projects: ['k-line-data-analysis', 'search-products', 'weather-forecast', 'image-resizing', 'price-comparison', 'job-aggregator']
        },
        {
            name: 'JavaScript',
            category: ['Programming Languages', 'Frontend'],
            level: 'Advanced',
            icon: SiJavascript,
            projects: ['job-aggregator']
        },
        {
            name: 'HTML',
            category: ['Frontend'],
            level: 'Advanced',
            icon: SiHtml5,
            projects: ['job-aggregator']
        },
        {
            name: 'CSS',
            category: ['Frontend'],
            level: 'Advanced',
            icon: SiCss3,
            projects: ['job-aggregator']

        },
        {
            name: 'SQL',
            category: ['Databases'],
            level: 'Advanced',
            icon: FaDatabase,
            projects: ['sales-dashboard']
        },
        {
            name: 'C',
            category: ['Programming Languages'],
            level: 'Intermediate',
            icon: SiC
        },
        {
            name: 'Java',
            category: ['Programming Languages'],
            level: 'Intermediate',
            icon: FaCode // Using a generic icon as a placeholder
        },
        {
            name: 'C#',
            category: ['Programming Languages'],
            level: 'Intermediate',
            icon: SiDotnet
        },
        // Data Analysis & Visualization
        {
            name: 'Power BI',
            category: ['Data Visualization'],
            level: 'Advanced',
            icon: FaChartBar, // Using a generic icon as a placeholder
            projects: ['sales-dashboard', 'data-analysis-dashboard', 'covid-insight-analysis']
        },
        {
            name: 'Tableau',
            category: ['Data Visualization'],
            level: 'Intermediate',
            icon: SiTableau,
            projects: ['user-requirements-analysis']
        },
        // Databases
        {
            name: 'MySQL',
            category: ['Databases'],
            level: 'Intermediate',
            icon: SiMysql,
            projects: ['data-analysis-dashboard']
        },
        {
            name: 'MariaDB',
            category: ['Databases'],
            level: 'Intermediate',
            icon: SiMariadb,
            projects: ['data-analysis-dashboard']
        },
        {
            name: 'SQLite',
            category: ['Databases'],
            level: 'Intermediate',
            icon: SiSqlite
        },
        // Version Control & Collaboration
        {
            name: 'Git',
            category: ['Version Control'],
            level: 'Advanced',
            icon: FaGit
        },
        {
            name: 'GitHub',
            category: ['Version Control'],
            level: 'Advanced',
            icon: FaGithub
        },
        {
            name: 'Docker',
            category: ['DevOps'],
            level: 'Intermediate',
            icon: SiDocker,
            other: 'Highly skilled in containerization, enhancing deployment efficiency and application scalability.'
        },
        // Frameworks/Libraries
        {
            name: 'React',
            category: ['Frontend', 'Programming Languages'],
            level: 'Advanced',
            icon: FaReact,
            projects: ['job-aggregator']
        },
        {
            name: 'Django',
            category: ['Backend', 'Programming Languages'],
            level: 'Advanced',
            icon: SiDjango,
            projects: ['weather-forecast', 'job-aggregator', 'price-comparison']
        },
        // Software Development
        {
            name: 'OOP',
            category: ['Software Development'],
            level: 'Advanced',
            icon: FaCode, // You can find a better icon for OOP
            other: 'Strong foundation in Object-Oriented Programming principles.'
        },
        {
            name: 'Data Structures & Algorithms',
            category: ['Software Development'],
            level: 'Advanced',
            icon: FaCode, // Consider an icon like a flowchart or algorithm symbol
            other: 'Proficient in various data structures and algorithm design and analysis.'
        },
        {
            name: 'Testing & Debugging',
            category: ['Software Development'],
            level: 'Advanced',
            icon: FaTools, // Or a bug icon for debugging
            other: 'Experienced in writing unit tests, integration tests, and debugging code effectively.'
        },
        {
            name: 'Agile Methodologies',
            category: ['Software Development'],
            level: 'Intermediate',
            icon: FaCode,
            other: 'Familiar with Agile development practices, including Scrum basics.'
        },
    ]
};

const Skills = () => {
    const [activeFilters, setActiveFilters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showScrollButton, setShowScrollButton] = useState(false);
    const skillsSectionRef = useRef(null);

    const filterCategories = [
        { name: 'Programming Languages', icon: FaCode },
        { name: 'Backend', icon: FaCode }, // Consider a different icon
        { name: 'Frontend', icon: FaReact },
        { name: 'Databases', icon: FaDatabase },
        { name: 'DevOps', icon: FaTools },
        { name: 'Data Visualization', icon: FaChartBar },
        { name: 'Version Control', icon: FaGit }
    ];

    const filteredSkills = useMemo(() => {
        return skillCategories['All Skills'].filter(skill => {
            const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
            const skillCategoriesArray = Array.isArray(skill.category) ? skill.category : [skill.category];
            const matchesFilters = activeFilters.length === 0 || skillCategoriesArray.some(category => activeFilters.includes(category));
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
            <h2 className="section-title">Skills</h2>
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
                                <div className="skill-categories">
                                    {skill.category.map(cat => (
                                        <span key={cat} className="skill-category">{cat}</span>
                                    ))}
                                </div>
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