import { Project, Testimonial, Service, Skill, NavLink, SocialLink } from "../types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" }
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "Dribbble", href: "https://dribbble.com", icon: "dribbble" }
];

export const services: Service[] = [
  {
    id: "web-dev",
    icon: "code",
    title: "Web Development",
    description: "Building responsive websites and dashboards with React, Next.js, Laravel, and clean frontend architectures.",
    features: ["Responsive application UI", "Reusable component-driven code", "Fast page interactions"]
  },
  {
    id: "backend",
    icon: "database",
    title: "Backend Development",
    description: "Designing server logic, APIs, and database workflows to keep applications stable and easy to extend.",
    features: ["RESTful APIs & data modeling", "Firebase / PHP / Laravel", "Authentication and secure routing"]
  },
  {
    id: "realtime",
    icon: "smartphone",
    title: "Real-Time Systems",
    description: "Creating live alert flows, tracking features, and instant notifications that feel reliable in critical moments.",
    features: ["Live tracking and alerts", "Firebase realtime flows", "Mobile-ready interactions"]
  },
  {
    id: "ui-ux",
    icon: "palette",
    title: "UX-Driven Interfaces",
    description: "Turning complex workflows into clear dashboards and controls for people who need to get work done quickly.",
    features: ["User-first page structures", "Practical dashboard layouts", "Accessible and simple interactions"]
  },
  {
    id: "ml",
    icon: "sparkles",
    title: "Data & Automation",
    description: "Applying practical Python and machine learning basics to support smarter actions and better predictions.",
    features: ["ML-powered decision support", "Python automation", "Predictive alerting & clustering"]
  },
  {
    id: "strategy",
    icon: "server",
    title: "Project Delivery",
    description: "Keeping projects grounded in real needs with practical planning, clear scope, and maintainable code.",
    features: ["Real-world project experience", "Problem-focused delivery", "Documentation and testing"]
  }
];

export const projects: Project[] = [
  {
    id: "taskpilot",
    title: "TaskPilot",
    description: "A smart todo and planning app with authentication, task priorities, and helpful microservices for daily planning.",
    image: "/images/project-saas.png",
    techStack: ["React", "Firebase", "Tailwind CSS", "Node.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Web App"
  },
  {
    id: "medusafe",
    title: "Medusafe",
    description: "A discreet emergency alert system with real-time tracking, SOS support, and risk-area clusters for safer movement in high-risk zones.",
    image: "/images/project-mobile.png",
    techStack: ["React Native", "Firebase", "Python", "Machine Learning"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Mobile App"
  },
  {
    id: "sarara",
    title: "Sarara",
    description: "A modern social cycling platform for small businesses with product listings, order processing, user roles, and inventory controls.",
    image: "/images/project-analytics.png",
    techStack: ["Laravel", "Filament", "Alpine.js", "PHP"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Dashboard"
  },
  {
    id: "mindwell",
    title: "MindWell",
    description: "A supportive mental health site where users can share stories, find resources, and interact anonymously in a safe community.",
    image: "/images/project-ecommerce.png",
    techStack: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Web App"
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description: "A responsive portfolio site showcasing resume details, projects, and contact information with a clean, modern design.",
    image: "/images/w.jpg",
    techStack: ["React", "Vite", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Design"
  },
  {
    id: "campus-connect",
    title: "Campus Connect",
    description: "A collaboration hub designed for student groups and project teams, with announcements, shared resources, and event updates.",
    image: "/images/project-ai.png",
    techStack: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Web App"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Project Lead",
    position: "Product Manager",
    company: "TaskPilot",
    review: "Nirmal helped turn our task management idea into a polished product with reliable flows and a clean interface.",
    rating: 5,
    avatar: "PL"
  },
  {
    id: "test-2",
    name: "David Chen",
    position: "Founder & CEO",
    company: "SaaSify",
    review: "Working with them was the best product development decision we've made. The AI tool's streaming response UI and custom components feel extremely premium. A masterclass in front-end design.",
    rating: 5,
    avatar: "DC"
  },
  {
    id: "test-3",
    name: "Team Lead",
    position: "Operations Manager",
    company: "MindWell",
    review: "The platform is easy to use and kept our community focused on meaningful support. Nirmal made the site feel calm and dependable.",
    rating: 5,
    avatar: "TM"
  },
  {
    id: "test-4",
    name: "Client",
    position: "Business Owner",
    company: "Sarara",
    review: "The dashboard is practical, fast, and easy for our team to manage. It solved exactly the problems we needed for inventory and order tracking.",
    rating: 5,
    avatar: "CO"
  }
];

export const skills: Skill[] = [
  // Frontend
  { name: "React / Next.js", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "Tailwind CSS", level: 95, category: "Frontend" },
  { name: "Framer Motion / Animations", level: 88, category: "Frontend" },
  
  // Backend
  { name: "Node.js / Express", level: 85, category: "Backend" },
  { name: "GraphQL & REST APIs", level: 90, category: "Backend" },
  { name: "PostgreSQL & Prisma", level: 82, category: "Backend" },
  { name: "MongoDB & Redis", level: 80, category: "Backend" },

  // UI/UX & Design
  { name: "UI/UX & Figma", level: 85, category: "Design" },
  { name: "Interactions & Micro-animations", level: 90, category: "Design" },

  // DevOps & Others
  { name: "Vercel / AWS / GCP", level: 80, category: "DevOps" },
  { name: "Docker & CI/CD Pipelines", level: 75, category: "DevOps" }
];
