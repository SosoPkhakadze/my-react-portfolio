import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCode, FaDatabase, FaChartBar, FaReact, FaTools,
    FaFilter, FaSearch, FaBrain, FaLayerGroup
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
            complexity: 4,
            learningCurve: 'Challenging',
            projects: ['k-line-data-analysis', 'search-products', 'weather-forecast', 'image-resizing', 'price-comparison']
        },
        {
            name: 'React',
            category: 'Frontend',
            level: 'Advanced',
            icon: FaReact,
            complexity: 5,
            learningCurve: 'Intermediate',
            projects: ['job-aggregator']
        },
        {
            name: 'Docker',
            category: 'DevOps',
            level: 'Intermediate',
            icon: FaTools,
            complexity: 3,
            learningCurve: 'Moderate',
            other: 'Highly skilled in containerization, enhancing deployment efficiency and application scalability.'
        },
        {
            name: 'MySQL',
            category: 'Databases',
            level: 'Intermediate',
            icon: FaDatabase,
            complexity: 3,
            learningCurve: 'Moderate',
            projects: ['data-analysis-dashboard']
        },
        {
            name: 'Data Analysis',
            category: 'Data Science',
            level: 'Advanced',
            icon: FaChartBar,
            complexity: 5,
            learningCurve: 'Challenging',
            projects: ['k-line-data-analysis', 'sales-dashboard', 'covid-insight-analysis']
        },
        {
            name: 'Django',
            category: 'Backend',
            level: 'Advanced',
            icon: FaCode, // Consider a different icon for Django, like a server icon
            complexity: 4,
            learningCurve: 'Challenging',
            projects: ['weather-forecast', 'job-aggregator', 'price-comparison']
        },
        {
            name: 'Power BI',
            category: 'Data Visualization',
            level: 'Advanced',
            icon: FaChartBar,
            complexity: 4,
            learningCurve: 'Moderate',
            projects: ['sales-dashboard', 'data-analysis-dashboard', 'covid-insight-analysis']
        },
        {
            name: 'Tableau',
            category: 'Data Visualization',
            level: 'Intermediate',
            icon: FaChartBar,
            complexity: 3,
            learningCurve: 'Moderate',
            projects: ['user-requirements-analysis']
        }
    ]
};

const ComplexityIndicator = ({ complexity }) => {
    return (
        <div className="complexity-indicator">
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    className={`complexity-dot ${index < complexity ? 'filled' : ''}`}
                ></span>
            ))}
        </div>
    );
};

const Skills = () => {
    const [activeFilters, setActiveFilters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');

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

    return (
        <section className="innovative-skills-section">
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

                <div className="view-mode-toggle">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={viewMode === 'grid' ? 'active' : ''}
                    >
                        <FaLayerGroup /> Grid
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={viewMode === 'list' ? 'active' : ''}
                    >
                        <FaBrain /> List
                    </button>
                </div>
            </div>

            <motion.div
                className={`skills-showcase ${viewMode}-view`}
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
                                <div className="skill-detail">
                                    <span>Complexity:</span>
                                    <ComplexityIndicator complexity={skill.complexity} />
                                </div>
                                <div className="skill-detail">
                                    <span>Learning Curve:</span>
                                    <span className="learning-curve">{skill.learningCurve}</span>
                                </div>
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
        </section>
    );
};

export default Skills;