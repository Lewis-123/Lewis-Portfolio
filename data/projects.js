// Project content. All copy is taken verbatim from commit ad12168.
// `featured` mirrors the original "Featured AI Project" badge.

const PROJECTS = [
    {
        slug: "sentinelai",
        name: "SentinelAI",
        subtitle: "AI Environmental Risk Intelligence Platform",
        badge: "Featured AI Project",
        featured: 1,
        description: [
            "An artificial intelligence platform that predicts and visualizes environmental risks using machine learning models, environmental datasets, predictive analytics, and geospatial visualization."
        ],
        tech: ["Python", "FastAPI", "React", "Machine Learning", "GIS"],
        link: { label: "GitHub Repository", href: "https://github.com/Lewis-123" }
    },
    {
        slug: "studyvoice",
        name: "StudyVoice AI",
        subtitle: "Generative AI Learning Platform",
        badge: "Featured AI Project",
        featured: 2,
        description: [
            "An AI-powered education platform that transforms text and voice inputs into interactive learning resources including summaries, flashcards, and quizzes."
        ],
        tech: ["Next.js", "TypeScript", "Generative AI", "LLMs", "Vercel AI SDK"],
        link: { label: "GitHub Repository", href: "https://github.com/Lewis-123" }
    },
    {
        slug: "kenya-shop",
        name: "Kenya Shop Ecommerce",
        subtitle: "Full-Stack Ecommerce Platform",
        badge: null,
        featured: false,
        description: [
            "A complete ecommerce application built for managing products, customers, authentication, product search, and administrative operations."
        ],
        tech: ["TypeScript", "Node.js", "Express.js", "MongoDB"],
        link: {
            label: "GitHub Repository",
            href: "https://github.com/Lewis-123/rust-jumia-kenya-ecommerce"
        }
    },
    {
        slug: "universal-ace",
        name: "Universal ACE",
        subtitle: "Community Savings Management System",
        badge: null,
        featured: false,
        description: [
            "A full-stack community savings management platform that enables administrators to manage groups, members, relationships, and financial records."
        ],
        tech: ["Next.js", "React", "MongoDB", "Tailwind CSS"],
        link: { label: "GitHub Repository", href: "https://github.com/Lewis-123/Universal-ACE" }
    },
    {
        slug: "financeflow",
        name: "FinanceFlow",
        subtitle: "Personal Finance Tracker",
        badge: null,
        featured: false,
        description: [
            "A financial management application that allows users to securely manage income, expenses, transactions, and financial analytics."
        ],
        tech: ["Node.js", "Express.js", "MongoDB", "Handlebars"],
        link: { label: "GitHub Repository", href: "https://github.com/Lewis-123/FinanceFlow" }
    },
    {
        slug: "weatherapp",
        name: "WeatherApp",
        subtitle: "Android Weather Application",
        badge: null,
        featured: false,
        description: [
            "A mobile weather application providing real-time weather information using external APIs, Firebase services, and modern Android architecture."
        ],
        tech: ["Java", "Kotlin", "Firebase", "Retrofit", "MVVM"],
        link: { label: "GitHub Repository", href: "https://github.com/Lewis-123/WeatherApp" }
    }
];

// The flat technology list shown on the home page, in its original order.
const TECHNOLOGIES = [
    "Python", "JavaScript", "TypeScript", "Java", "SQL",
    "React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS",
    "Node.js", "Express.js", "FastAPI", "REST APIs",
    "MongoDB", "MongoDB Atlas", "PostgreSQL", "Firebase",
    "Artificial Intelligence", "Generative AI", "Large Language Models (LLMs)",
    "AI Application Development",
    "Machine Learning", "Deep Learning", "Data Science", "Data Analysis",
    "Pandas", "NumPy", "Scikit-learn",
    "Git", "GitHub", "Docker", "Cloud Deployment", "Vercel", "Render",
    "Android Development", "Kotlin", "Firebase Authentication", "MVVM Architecture"
];

const bySlug = (slug) => PROJECTS.find((project) => project.slug === slug);

const featured = () =>
    PROJECTS.filter((project) => project.featured).sort((a, b) => a.featured - b.featured);

// Previous/next wrap around so a project never dead-ends.
const neighbours = (slug) => {
    const index = PROJECTS.findIndex((project) => project.slug === slug);
    if (index < 0) {
        return { prev: null, next: null };
    }
    return {
        prev: PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length],
        next: PROJECTS[(index + 1) % PROJECTS.length]
    };
};

module.exports = { PROJECTS, TECHNOLOGIES, bySlug, featured, neighbours };
