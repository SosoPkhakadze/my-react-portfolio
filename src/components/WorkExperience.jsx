import React from 'react';
import './WorkExperience.css';

const WorkExperienceItem = ({ title, company, date, description }) => {
    return (
        <div className="work-experience-item">
            <h3>{title}</h3>
            <h4>{company}</h4>
            <p className="date">{date}</p>
            <ul>
                {description.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </div>
    );
};

const WorkExperience = () => {
    const experiences = [
        {
            title: 'Data Engineer & AI Training Support Specialist',
            company: 'Netex Consulting LLC',
            date: 'Apr 2022 - Aug 2023',
            description: [
                'Led data preparation efforts for a large-scale AI training initiative, annotating over 300,000 thermal and standard images to mark targets, directly enhancing object detection algorithms for livestock monitoring.',
                'Optimized and streamlined environmental data reporting to improve resource allocation and operational efficiency on distributed datasets.',
                'Collaborated closely with a distributed team, leveraging remote communication tools to ensure 99% data annotation accuracy and consistency in reporting, which significantly contributed to the project\'s machine-learning performance.',
                'Delivered high-quality labeled datasets that contributed to machine learning model accuracy, enabling automation in livestock health assessment.'
            ]
        },
        {
            title: 'QA Engineer',
            company: 'DevsData',
            date: 'Jul 2024 - Present',
            description: [
                'Conducted in-depth QA for backend functionalities across Python and JavaScript applications, reviewing code for over 10 new features every month and identifying issues early to ensure 100% reliable deployment across all platforms.',
                'Tested and debugged backend processes and browser extensions to confirm seamless integration and operation, identifying issues in data processing and API calls to improve system reliability and performance.',
                'Developed and implemented automated test scripts for backend tasks, reducing manual testing time by 80% and enhancing accuracy and efficiency.',
                'Verified frontend deployment and user interface integrity for over 20 user interface elements daily, ensuring that features operate correctly on the user end, with thorough testing of CSS styling, and content display across devices.',
                'Managed content quality for published articles, conducting thorough reviews to ensure 100% grammatical accuracy and clear, precise messaging, maintaining high standards in both readability and formatting on the website.'
            ]
        },
        // Add more experiences if needed
    ];

    return (
        <section id="experience">
            <h2>Work Experience</h2>
            {experiences.map((experience, index) => (
                <WorkExperienceItem key={index} {...experience} />
            ))}
        </section>
    );
};

export default WorkExperience;