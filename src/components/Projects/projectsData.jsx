import jobSearch1 from "../assets/Job_Search/Job_Search_1.png";
import jobSearch2 from "../assets/Job_Search/Job_Search_2.png";
import jobSearch3 from "../assets/Job_Search/Job_Search_3.png";


import productSearch1 from "../assets/Product_Search/Product_Search_1.png";
import productSearch2 from "../assets/Product_Search/Product_Search_2.png";

import weather1 from "../assets/Weather/Weather_1.png";
import weather2 from "../assets/Weather/Weather_2.png";

import kLine1 from "../assets/K-Line/K-Line_1.png";
import kLine2 from "../assets/K-Line/K-Line_2.png";
import kLine3 from "../assets/K-Line/K-Line_3.png";

import TikTokReport1 from "../assets/TikTokReport/TikTokReport_2.png";
import TikTokReport2 from "../assets/TikTokReport/TikTokReport_2.png";

import salesDashboard1 from "../assets/Sales_Dashboard/Sales_Dashboard_1.jpg";
import salesDashboard2 from "../assets/Sales_Dashboard/Sales_Dashboard_2.jpg";

import browseRepos1 from "../assets/Browse_Repos/Browse-Repos_1.png";
import browseRepos2 from "../assets/Browse_Repos/Browse-Repos_2.png";


const projectsData = [
  {
    id: 'github-repo-browser',
    title: 'GitHub Repository Browser',
    shortDescription: 'OAuth-powered GitHub repository viewer',
    description:
      'A Flask-based web application that enables GitHub users to authenticate and browse their repositories. Features include technology-based filtering, responsive design, and secure OAuth integration.',
    technologies: ['Python', 'Flask', 'GitHub API', 'OAuth'],
    githubLink: 'https://github.com/SosoPkhakadze/Github-repository-browsing',
    filter: ['python', 'flask'],
    images: [browseRepos1, browseRepos2]
  },
    {
      id: 'k-line-data-analysis',
      title: 'K-line Data Analysis',
      shortDescription: 'Financial data analysis using Python',
      description:
        'This project focuses on analyzing financial K-line data using Python libraries like Pandas, NumPy, Matplotlib, and mplfinance. It involves data cleaning, statistical analysis, and visualization to derive meaningful insights from K-line charts (candlestick charts).',
      technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
      githubLink: 'https://github.com/SosoPkhakadze/K-line-Data-Analysis',
      filter: ['python'],
      images: [kLine1, kLine2, kLine3],
    },
    {
      id: 'search-products',
      title: 'Search Products',
      shortDescription: 'E-commerce product search application',
      description:
        'Developed a web application for searching products from an e-commerce platform. The project uses web scraping API (RapidAPI) to extract product information and provide search functionality.',
      technologies: ['Python', 'Django', 'RapidAPI'],
      githubLink: 'https://github.com/SosoPkhakadze/Search_Products',
      filter: ['python', 'bases'],
      images: [productSearch1, productSearch2],
    },
    {
      id: 'weather-forecast',
      title: 'Weather Forecast',
      shortDescription: 'Location-based weather app with Django',
      description:
        'A Django-based weather forecast application that utilizes the OpenWeatherMap API to fetch and display current weather data based on user location or a specified city. It includes backend functionality to handle API requests and a frontend to present the weather information.',
      technologies: ['Django', 'Python', 'OpenWeatherMap API'],
      githubLink: 'https://github.com/SosoPkhakadze/Weather-forecast',
      filter: ['django', 'python'],
      images: [weather1, weather2],
    },
    {
      id: "job-aggregator",
      title: "Job Aggregator Website",
      shortDescription: "Full-stack job search platform",
      description:
        "Developed a full-stack web application utilizing Django for backend and React for frontend, enabling users to search for job listings based on title and location. Integrated with an external API to fetch real-time job data. Implemented features for displaying search results and viewing detailed job information.",
      technologies: ["React", "Django", "Python", "RapidAPI"],
      githubLink: "https://github.com/SosoPkhakadze/Job_Search",
      filter: ["react", "django", "python"],
      images: [jobSearch1, jobSearch2, jobSearch3],
    },
    {
      id: 'image-resizing',
      title: 'Image Resizing & Interpolation',
      shortDescription: 'Algorithmic image manipulation',
      description:
        'Built an image resizing application from scratch using bilinear and bicubic interpolation techniques without relying on built-in libraries. This project demonstrates fundamentals of image processing and displays results through Matplotlib for visualization.',
      technologies: ['Python', 'Matplotlib'],
      filter: ['python']
    },
    {
      id: 'sales-dashboard',
      title: 'Sales Dashboard',
      shortDescription: 'Data-driven sales insights with Tableau',
      description:
        'Developed an advanced sales dashboard using Tableau, leveraging data from SQL databases. Demonstrated expertise in data cleaning, exploratory data analysis, and predictive modeling to uncover actionable insights driving business decisions.',
      technologies: ['Tableau', 'SQL'],
      filter: ['tabi'],
      images: [salesDashboard1, salesDashboard2],
    },
    {
      id: 'tiktok-insight-analysis',
      title: 'TikTok content Analysis Dashboard',
      shortDescription: 'TikTok content analyze with Power BI',
      description:
        'Leveraged Power BI to analyze TikTok account data, providing insights about views, age statistics, and genders interested in the content. This project can be used by anyone with their own data to better visualize if the content and videos are being liked by people.',
      technologies: ['Power BI'],
      filter: ['tabi'],
      images: [TikTokReport1, TikTokReport2],
    },
    {
      id: 'react-portfolio',
      title: 'React Portfolio Website',
      shortDescription: 'Personal portfolio showcasing projects and skills',
      description:
        'This very website you are browsing! Built with React, it showcases my projects, skills, and experience. It features a responsive design, a filterable project section, and a dark/light mode toggle. The site also includes smooth animations, interactive elements and it is completely accessable from any device.',
      technologies: ['React', 'CSS', 'JavaScript'],
      githubLink: 'https://github.com/SosoPkhakadze/my-react-portfolio',
      liveLink: 'https://sosopkhakadze.github.io/my-react-portfolio/',
      filter: ['react'],
    },
  ];
  
  export default projectsData;