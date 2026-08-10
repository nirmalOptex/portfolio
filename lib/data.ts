import {
  Project,
  Service,
  Skill,
  Experience,
  Education,
  Award,
} from "@/types";

/**
 * Static content collections. Site-wide copy and identity live in `lib/site.ts`.
 *
 * Everything here traces back to `nirmalcv.md` — job titles, dates, project
 * stacks, grades. Keep the two in step; if the CV does not say it, it does not
 * belong here.
 */

export const services: Service[] = [
  {
    id: "backend",
    icon: "database",
    title: "Backend Development",
    description:
      "Building and maintaining APIs, server-side logic, and the database layer underneath — the work I do day to day at Ek Ra Sunya.",
    features: [
      "RESTful API design and integration",
      "Authentication and session handling",
      "Debugging, optimisation, deployment",
    ],
  },
  {
    id: "web-dev",
    icon: "code",
    title: "Frontend Development",
    description:
      "Turning designs into responsive interfaces with React and Vite, from marketing pages to the CRM and HRMS dashboards I built at DigiSchool Global.",
    features: [
      "Component-driven React interfaces",
      "Responsive layouts across breakpoints",
      "Coordination with backend and design",
    ],
  },
  {
    id: "fullstack",
    icon: "server",
    title: "Full-Stack Applications",
    description:
      "Taking a project end to end — schema, server, and interface — in the stacks I have shipped with: Laravel, PHP, MySQL, Supabase, and Firebase.",
    features: [
      "Laravel and PHP applications",
      "MySQL, MongoDB, and Supabase",
      "Roles, permissions, and admin tooling",
    ],
  },
  {
    id: "realtime",
    icon: "smartphone",
    title: "Real-Time & Mobile",
    description:
      "Live tracking and alert flows that have to work when they matter. Medusafe pairs React Native with Firebase for exactly this.",
    features: [
      "GPS tracking and SOS flows",
      "Firebase realtime data",
      "React Native mobile builds",
    ],
  },
  {
    id: "data",
    icon: "sparkles",
    title: "Data Analysis",
    description:
      "Exploratory analysis, statistical modelling, and visualisation — the specialisation of my BCS and the part I reach for when a decision needs evidence.",
    features: [
      "Exploratory data analysis",
      "Statistical modelling",
      "Charts and visual reporting",
    ],
  },
  {
    id: "ml",
    icon: "palette",
    title: "Applied Machine Learning",
    description:
      "Practical Python models put to work inside a product, like the risk-area clustering that decides which zones Medusafe treats as high risk.",
    features: [
      "Clustering and risk scoring",
      "Python model backends",
      "Models wired into a live product",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "medusafe",
    title: "Medusafe",
    description:
      "A discreet emergency alert system for people moving through high-risk areas. GPS tracking and an SOS trigger sit on top of machine-learning risk-area clustering, with a React Native app for the field and a Python service behind the admin dashboard. Winner of the Best Capstone Project Award 2025.",
    image: "/images/project-mobile.png",
    techStack: ["React Native", "Firebase", "Python", "Machine Learning"],
    liveUrl: "",
    githubUrl: "",
    category: "Mobile App",
  },
  {
    id: "sarara",
    title: "Sarara",
    description:
      "A community platform built on Laravel with Filament and Alpine.js, covering listings, order processing, roles and permissions, and inventory control behind a reactive admin UI. Recognised with the Best Critical Thinking Project award in 2025.",
    image: "/images/project-analytics.png",
    techStack: ["Laravel", "Filament", "Alpine.js", "PHP"],
    liveUrl: "",
    githubUrl: "",
    category: "Web App",
  },
  {
    id: "taskpilot",
    title: "TaskPilot",
    description:
      "A productivity app for managing daily tasks and longer-term goals, with a modern interface, seamless authentication, and microservices that help with planning, prioritisation, and tracking.",
    image: "/images/project-saas.png",
    techStack: ["React", "Authentication", "Microservices"],
    liveUrl: "",
    githubUrl: "",
    category: "Web App",
  },
  {
    id: "mindwell",
    title: "MindWell",
    description:
      "A mental health support platform in PHP and MySQL where people share experiences anonymously, find resources, and read community blog posts — with moderation tools so the space stays safe.",
    image: "/images/project-ecommerce.png",
    techStack: ["PHP", "MySQL", "JavaScript"],
    liveUrl: "",
    githubUrl: "",
    category: "Web App",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description:
      "A responsive portfolio bringing together my résumé and project work, built with React and Vite and deployed on GitHub Pages.",
    image: "/images/w.jpg",
    techStack: ["React", "Vite", "Tailwind CSS"],
    liveUrl: "",
    githubUrl: "",
    category: "Design",
  },
];

/** Newest first — the About section renders this order as a timeline. */
export const experience: Experience[] = [
  {
    id: "ek-ra-sunya",
    company: "Ek Ra Sunya",
    location: "Kathmandu, Nepal",
    roles: [
      { title: "Backend Developer", period: "June 2026 – Present", current: true },
      { title: "Backend Intern", period: "February 2026 – May 2026" },
    ],
    highlights: [
      "Develop and maintain backend APIs and server-side functionality.",
      "Work across databases, authentication systems, and RESTful API integrations.",
      "Collaborate with frontend developers on application performance and scalability.",
      "Take part in debugging, optimisation, and deployment workflows.",
    ],
  },
  {
    id: "digischool-global",
    company: "DigiSchool Global",
    location: "Kathmandu, Nepal",
    roles: [
      { title: "Project Support Trainee", period: "November 2025 – January 2026" },
      { title: "Project Support Intern", period: "July 2025 – September 2025" },
    ],
    highlights: [
      "Built in-house CRM and HRMS web applications as a frontend developer.",
      "Coordinated with the backend and design teams to ship usable interfaces.",
      "Supported academic operations, curriculum management, and learning platform activity.",
      "Helped with testing, debugging, and system usability and performance.",
    ],
  },
  {
    id: "cloudfactory",
    company: "CloudFactory",
    location: "Kathmandu, Nepal",
    roles: [{ title: "Data Entry Clerk", period: "March 2023 – May 2023" }],
    highlights: [
      "Assessed, entered, and maintained large volumes of data with close attention to accuracy.",
      "Kept data consistent and intact by following standard entry procedures and quality requirements.",
    ],
  },
];

export const education: Education[] = [
  {
    id: "taylors",
    institution: "Taylor's University, Malaysia",
    qualification: "BSc (Hons) Computer Science — Data Science specialisation",
    detail: "Studied at IIMS College, Kathmandu (partner institution)",
    period: "2022 – 2026",
    score: "CGPA 3.65",
  },
  {
    id: "uniglobe",
    institution: "Uniglobe College, Kathmandu",
    qualification: "Higher Secondary Education (Science)",
    period: "Completed 2022",
    score: "GPA 3.57",
  },
  {
    id: "whitefield",
    institution: "Whitefield School, Kathmandu",
    qualification: "Secondary Education (Science)",
    period: "Completed 2020",
    score: "GPA 3.35",
  },
];

export const awards: Award[] = [
  {
    id: "deans-list",
    title: "Dean's List Commendation",
    issuer: "Taylor's University · Multiple semesters",
    description:
      "Recognised for sustained academic performance across several semesters of the programme.",
  },
  {
    id: "best-capstone",
    title: "Best Capstone Project Award",
    issuer: "2025 · Medusafe",
    description:
      "Awarded for Medusafe, a discreet emergency alert and risk-assessment app combining GPS tracking with machine learning for real-time threat detection.",
  },
  {
    id: "best-critical-thinking",
    title: "Best Critical Thinking Project",
    issuer: "2025 · Sarara",
    description:
      "Honoured for problem-solving and innovation in building Sarara, a Laravel community platform using Filament and Alpine.js.",
  },
];

/** Skill categories render in this order in the About section. */
export const skills: Skill[] = [
  { name: "React", category: "Frontend" },
  { name: "Vite", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Alpine.js", category: "Frontend" },
  { name: "React Native", category: "Frontend" },

  { name: "Laravel", category: "Backend" },
  { name: "PHP", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "Authentication", category: "Backend" },
  { name: "Filament", category: "Backend" },

  { name: "MySQL", category: "Data & ML" },
  { name: "MongoDB", category: "Data & ML" },
  { name: "Supabase", category: "Data & ML" },
  { name: "Firebase", category: "Data & ML" },
  { name: "Python", category: "Data & ML" },
  { name: "Exploratory Data Analysis", category: "Data & ML" },
  { name: "Statistical Modelling", category: "Data & ML" },
  { name: "Data Visualisation", category: "Data & ML" },

  { name: "Problem-solving & analytical thinking", category: "Ways of Working" },
  { name: "Communication & teamwork", category: "Ways of Working" },
  { name: "Adaptability & continuous learning", category: "Ways of Working" },
  { name: "Time management & project planning", category: "Ways of Working" },
];
