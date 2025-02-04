import jobSearch1 from "../assets/Job_Search/Job_Search_1.png";
import jobSearch2 from "../assets/Job_Search/Job_Search_2.png";
import jobSearch3 from "../assets/Job_Search/Job_Search_3.png";



const projectsData = [
    {
      id: 'k-line-data-analysis',
      title: 'K-line Data Analysis',
      shortDescription: 'Financial data analysis using Python',
      description:
        'This project focuses on analyzing financial K-line data using Python libraries like Pandas, NumPy, Matplotlib, and mplfinance. It involves data cleaning, statistical analysis, and visualization to derive meaningful insights from K-line charts (candlestick charts).',
      technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'mplfinance'],
      githubLink: 'https://github.com/SosoPkhakadze/K-line-Data-Analysis',
      filter: ['python']
    },
    {
      id: 'search-products',
      title: 'Search Products',
      shortDescription: 'E-commerce product search application',
      description:
        'Developed a web application for searching products from an e-commerce platform. The project uses web scraping techniques (likely with libraries like BeautifulSoup) to extract product information and provide search functionality.',
      technologies: ['Python', 'Web Scraping', 'BeautifulSoup'],
      githubLink: 'https://github.com/SosoPkhakadze/Search_Products',
      filter: ['python', 'bases']
    },
    {
      id: 'weather-forecast',
      title: 'Weather Forecast',
      shortDescription: 'Location-based weather app with Django',
      description:
        'A Django-based weather forecast application that utilizes the OpenWeatherMap API to fetch and display current weather data based on user location or a specified city. It includes backend functionality to handle API requests and a frontend to present the weather information.',
      technologies: ['Django', 'Python', 'OpenWeatherMap API'],
      githubLink: 'https://github.com/SosoPkhakadze/Weather-forecast',
      filter: ['django', 'python']
    },
    {
      id: 'job-aggregator',
      title: 'Job Aggregator Website',
      shortDescription: 'Full-stack job search platform',
      description:
        'Developed a full-stack web application utilizing Django for backend and React for frontend, enabling users to search for job listings based on title and location. Integrated with an external API to fetch real-time job data. Implemented features for displaying search results and viewing detailed job information.',
      technologies: ['React', 'Django', 'Python'],
      githubLink: 'https://github.com/SosoPkhakadze/Job_Search',
      filter: ['react', 'django', 'python'],
      images: [jobSearch1, jobSearch2, jobSearch3]
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
      id: 'price-comparison',
      title: 'Price Comparison',
      shortDescription: 'Real-time price tracking web app',
      description:
        'Developed a price comparison web application using Django, integrating scraping scripts for major e-commerce websites like Amazon, eBay, Walmart, Target, Etsy, and Wayfair. Implemented sorting functionality to display search results from cheapest to most expensive.',
      technologies: ['Python', 'Django', 'BeautifulSoup'],
      filter: ['django', 'python', 'bases']
    },
    {
      id: 'sales-dashboard',
      title: 'Sales Dashboard',
      shortDescription: 'Data-driven sales insights with Power BI',
      description:
        'Developed an advanced sales dashboard using Power BI, leveraging data from SQL databases. Demonstrated expertise in data cleaning, exploratory data analysis, and predictive modeling to uncover actionable insights driving business decisions.',
      technologies: ['Power BI', 'SQL'],
      filter: ['tabi']
    },
    {
      id: 'data-analysis-dashboard',
      title: 'Data Analysis Dashboard',
      shortDescription: 'Restaurant performance analysis with Power BI',
      description:
        'Designed a comprehensive data analysis dashboard for a Pizza Restaurant using Power BI and MariaDB, delivering key performance indicators and actionable insights, facilitating strategic decision-making and business optimization.',
      technologies: ['Power BI', 'MariaDB'],
      filter: ['tabi', 'bases']
    },
    {
      id: 'covid-insight-analysis',
      title: 'COVID Insight Analysis Dashboard',
      shortDescription: 'Public health data exploration with Power BI',
      description:
        'Leveraged Power BI to analyze COVID-19 data, providing insights into virus spread, vaccination rates, and their impact on public health and the economy. Integrated diverse data sources, crafted interactive visualizations, enabling users to discern trends for informed decision-making.',
      technologies: ['Power BI'],
      filter: ['tabi']
    },
    {
      id: 'user-requirements-analysis',
      title: 'User Requirements Analysis Dashboard',
      shortDescription: 'Tableau dashboard for user insights',
      description:
        'Developed a comprehensive Tableau dashboard project by analyzing user requirements, creating mockups, and deciding on chart types. Built the data model, prepared the data source, and created various charts. Designed the layout container and constructed the dashboard to deliver insightful visualizations.',
      technologies: ['Tableau'],
      filter: ['tabi']
    },
  ];
  
  export default projectsData;