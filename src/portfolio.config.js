/**
 * PORTFOLIO CONFIGURATION FILE
 * 
 * Edit this file to customize your portfolio!
 * All text, images, projects, skills, and experience can be modified here.
 * No need to touch the component files - just update this config.
 */

export const portfolioConfig = {
    // ============================================
    // PERSONAL INFORMATION
    // ============================================
    personal: {
        name: "Raj Kumar",
        title: "Full-Stack Software Engineer",
        subtitle: "AI & Backend Specialist",
        tagline: "Pursuing excellence through innovation in software development and complex system architecture.",

        // Add your profile picture here
        // Can be a URL or path to image in /public folder
        profileImage: "/avatar.svg", // Put your image in public/profile.jpg

        // Add multiple images if you want a gallery
        gallery: [
            "/profile.jpg",
            // "/profile2.jpg",
            // "/profile3.jpg",
        ],

        highlights: [
            "React",
            "Node.js",
            "Gen AI",
            "Python"
        ],

        // Social Links
        social: {
            github: "https://github.com/1921raj",
            linkedin: "https://www.linkedin.com/in/rajkamal-221214204/",
            email: "raj1921198131@gmail.com",
            twitter: "#", // optional
            portfolio: "#", // optional
        }
    },

    // ============================================
    // PROJECTS - Add/Remove as needed
    // ============================================
    projects: [
        {
            id: 1,
            title: "Ecommerce Web-App",
            description: "Developed a user-friendly e-commerce application supporting online transactions via REST API. Integrated real-time analytics for stock and asset management, visually represented using pie graphs. Designed and implemented sign-up and login pages with email verification for enhanced user authentication.",
            technologies: ["React.js", "Node.js", "REST API", "Email Verification", "Analytics"],
            color: "#00f0ff", // Cyan
            icon: "database", // Options: cpu, rocket, database, cloud, code, terminal
            github: "https://github.com/1921raj",
            liveDemo: "#",
            highlights: [
                "Real-time analytics & graphs",
                "Secure email verification",
                "REST API integration",
                "Stock management system"
            ]
        },
        {
            id: 2,
            title: "Movies Web-App",
            description: "Designed and developed a dynamic movie application that fetches real-time data from a movie API. Implemented features like movie search, filtering by genre, and displaying detailed movie information. Utilized API data to showcase trending movies, upcoming releases, and personalized recommendations.",
            technologies: ["React.js", "Node.js", "RESTful API", "Movie API", "Responsive UI"],
            color: "#0066ff", // Blue
            icon: "rocket",
            github: "https://github.com/1921raj",
            liveDemo: "#",
            highlights: [
                "Real-time movie data fetching",
                "Advanced filtering & search",
                "Personalized recommendations",
                "Responsive UI/UX design"
            ]
        }
    ],

    // ============================================
    // SKILLS - Organized by categories
    // ============================================
    skills: {
        // Each category becomes a 3D animated cube in space!
        categories: [
            {
                name: "Programming Languages",
                color: "#00f0ff",
                icon: "💻",
                skills: [
                    { name: "C++", level: 90, description: "Data Structures, Algorithms, OOP" },
                    { name: "Java", level: 85, description: "Core Java, OOP Concepts" },
                    { name: "Python", level: 88, description: "Scripting, Data Analysis, AI/ML" },
                    { name: "C", level: 80, description: "System Programming, pointers" },
                ]
            },
            {
                name: "Frontend & Tools",
                color: "#0066ff",
                icon: "⚙️",
                skills: [
                    { name: "React.js", level: 90, description: "Modern hooks, State management" },
                    { name: "Angular", level: 80, description: "Full MVC framework" },
                    { name: "Tableau", level: 85, description: "Data Visualization, Dashboards" },
                    { name: "Excel & VBA", level: 95, description: "Advanced formulas, Macros, Automation" },
                ]
            },
            {
                name: "Backend & Databases",
                color: "#8800ff",
                icon: "☁️",
                skills: [
                    { name: "Node.js", level: 88, description: "Express, Event loop, Async programming" },
                    { name: "MySQL", level: 85, description: "Relational DB design, complex queries" },
                    { name: "PostgreSQL", level: 82, description: "Advanced SQL features" },
                    { name: "MongoDB", level: 85, description: "NoSQL document storage, Aggregation" },
                ]
            },
            {
                name: "Other Skills",
                color: "#ff00aa",
                icon: "🤖",
                skills: [
                    { name: "RESTful APIs", level: 92, description: "API design, integration, Postman" },
                    { name: "Microservices", level: 80, description: "Distributed architecture, Scalability" },
                    { name: "Agile / Scrum", level: 90, description: "Sprint planning, Jira, Collaboration" },
                    { name: "Git / VCS", level: 88, description: "Version control, Branching, Merging" },
                    { name: "TDD", level: 85, description: "Test Driven Development, Unit Testing" },
                ]
            },
        ]
    },

    // ============================================
    // EXPERIENCE / WORK HISTORY
    // ============================================
    experience: [
        {
            title: "Software Engineer",
            company: "IIIT BHOPAL",
            location: "Bhopal, India",
            period: "Feb 2025 - Present",
            color: "#00f0ff",
            achievements: [
                "Designed and developed a Generative AI–enhanced conversational system for automated support.",
                "Built context-aware LLM chat workflows for user support and simulated emergency scenarios.",
                "Implemented prompt engineering and response validation for safe AI-generated outputs.",
                "Integrated RESTful backend APIs using Node.js and Python for real-time conversational logic.",
                "Managed end-to-end SDLC from requirement analysis to deployment on cloud platforms."
            ],
            technologies: ["Generative AI", "LLMs", "Node.js", "Python", "MongoDB", "REST APIs"]
        },
        {
            title: "System and Network Administrator",
            company: "Govt. Engineering College, Buxar",
            location: "Buxar, Bihar",
            period: "Jan 2024 - Jan 2025",
            color: "#0066ff",
            achievements: [
                "Led back-end operations and managed databases using React.js and Node.js technologies.",
                "Managed network support services, including IP management, antivirus, and WAF implementation.",
                "Enforced cybersecurity measures and administered VLAN, servers, and switches.",
                "Developed new software applications and maintained existing ones on servers.",
                "Provided technical support for NIC video conferencing and general IT operations."
            ],
            technologies: ["React.js", "Node.js", "Network Admin", "Cybersecurity", "Server Management"]
        },
        {
            title: "Data Analytics Intern",
            company: "Cedar Management Ltd.",
            location: "Remote",
            period: "July 2023 - Dec 2023",
            color: "#8800ff",
            achievements: [
                "Executed SQL queries for data extraction and utilized Power BI for visualizations.",
                "Automated repetitive Excel tasks using VBA, enhancing productivity significantly.",
                "Remotely managed servers via Zoho Assist, ensuring seamless backups and updates.",
                "Designed custom Excel add-ins to simplify complex data analysis.",
                "Boosted sales by 15% through data-driven customer segment targeting."
            ],
            technologies: ["SQL", "Power BI", "Excel VBA", "Zoho Assist", "Data Analysis"]
        },
        {
            title: "Software Developer Intern",
            company: "GAO TEK Group",
            location: "Remote",
            period: "Mar 2023 - May 2023",
            color: "#ff00aa",
            achievements: [
                "Managed updates and documentation for existing software features.",
                "Implemented MD5 hashing and resolved CORS issues in .NET framework context.",
                "Designed and developed new APIs adhering to best coding practices.",
                "Managed image database integrations."
            ],
            technologies: [".NET", "API Development", "MD5", "Database Integration"]
        },
        {
            title: "Intern",
            company: "Raja Ramanna Centre for Advanced Technology",
            location: "Indore",
            period: "June 2021 – July 2021",
            color: "#ffd700",
            achievements: [
                "Developed a deep learning CNN model to detect COVID-related pulmonary diseases using chest X-rays.",
                "Employed Google's Inception pre-trained model and achieved 94.6% accuracy rate."
            ],
            technologies: ["Deep Learning", "CNN", "Python", "Computer Vision", "TensorFlow"]
        }
    ],

    // ============================================
    // EDUCATION
    // ============================================
    education: [
        {
            degree: "B.Tech in Computer Science",
            institution: "VIT University",
            location: "Vellore, India",
            period: "2019 - 2023",
            color: "#00f0ff",
            details: [
                "CGPA: 8.36",
                "Relevant Coursework: Data Structures, Algorithms, DBMS, OS, Computer Networks"
            ]
        },
        {
            degree: "Intermediate (Class XII)",
            institution: "CBSE Board",
            location: "India",
            period: "2017",
            color: "#0066ff",
            details: [
                "Percentage: 68.2%",
                "Science Stream (PCM)"
            ]
        },
        {
            degree: "Matriculation (Class X)",
            institution: "CBSE Board",
            location: "India",
            period: "2015",
            color: "#8800ff",
            details: [
                "Completed secondary education with good academic standing."
            ]
        }
    ],

    // ============================================
    // CUSTOM CARDS - Add any custom content sections
    // ============================================
    customCards: [],

    // ============================================
    // 3D SPACE SETTINGS
    // ============================================
    space3D: {
        // Particle field settings
        particles: {
            count: 3000, // Number of particles (reduce for better performance)
            colors: ["#00f0ff", "#0066ff", "#8800ff", "#ff00aa"], // Particle colors
        },

        // Profile cube settings
        profileCube: {
            enabled: true, // Show your profile picture as a rotating cube
            size: 3, // Cube size
            position: [15, 5, -20], // X, Y, Z position in 3D space
            rotationSpeed: 0.5, // How fast it rotates
        },

        // Tech cubes (animated technology logos flying in space)
        techCubes: {
            enabled: true, // Enable/disable tech cubes
            // Technologies to show as 3D cubes - uses colors from skill categories
            technologies: [
                { name: "React", color: "#00f0ff", logo: "/logos/react.png" },
                { name: "Node.js", color: "#0066ff", logo: "/logos/nodejs.png" },
                { name: "Three.js", color: "#8800ff", logo: "/logos/threejs.png" },
                { name: "AWS", color: "#ff00aa", logo: "/logos/aws.png" },
                // Add more tech cubes here
            ]
        }
    },

    // ============================================
    // CONTACT INFORMATION
    // ============================================
    contact: {
        availability: "Available for freelance projects",
        openToCollaboration: true,
        responseTime: "24-48 hours",
        timezone: "IST (UTC+5:30)",
        preferredContact: "email", // email, linkedin, etc.
    },

    // ============================================
    // MISC SETTINGS
    // ============================================
    settings: {
        // Enable/disable sections
        showProjects: true,
        showSkills: true,
        showExperience: true,
        showContact: true,
        showCustomCards: true,

        // Theme colors (can be customized)
        theme: {
            primaryCyan: "#00f0ff",
            primaryBlue: "#0066ff",
            primaryViolet: "#8800ff",
            accentPink: "#ff00aa",
            accentGold: "#ffd700",
        },

        // Loading screen
        loadingDuration: 2000, // milliseconds
        loadingText: "Initializing Digital Space...",
    }
};

export default portfolioConfig;
