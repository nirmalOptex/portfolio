import { NavLink, SocialLink } from "@/types";

/**
 * Single source of truth for all site copy and identity.
 *
 * This is a fully static site — there is no CMS and no backend. Everything a
 * visitor reads is defined here or in `lib/data.ts` (the collections).
 * Change it here and it changes everywhere.
 *
 * Facts here come from `nirmalcv.md`. The CV also carries a phone number and a
 * street address; both are deliberately left off the site — a public page gets
 * scraped in a way a CV sent to an employer does not.
 */

export const CONTACT_EMAIL = "mzn.nirmal700@gmail.com";

export const siteConfig = {
  name: "Nirmal Maharjan",
  shortName: "Nirmal",
  role: "Backend Developer",
  url: "https://nirmalmaharjan1.com.np",
  email: CONTACT_EMAIL,
  /** City only — the footer prefixes this with "Based in". */
  location: "Kathmandu, Nepal",
  /** Current status, not an availability claim — the CV does not make one. */
  availability: "Currently at Ek Ra Sunya",
  description:
    "Backend developer in Kathmandu and BCS undergraduate specialising in Data Science. I build APIs, full-stack web applications, and real-time systems with React, Laravel, Firebase, and Python.",
  ogImage: "/images/project-saas.png",
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

/** Only the two profiles the CV actually lists. */
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/nirmaloptex", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nirmal-maharjan-a15018233/",
    icon: "linkedin",
  },
];

export const heroContent = {
  eyebrow: "Backend Developer at Ek Ra Sunya",
  title: "I build the backend\nthat keeps web products\nrunning.",
  rotatingWords: [
    "Backend Developer",
    "Full-Stack Web Developer",
    "Data Science Undergraduate",
  ],
  body: "I'm Nirmal Maharjan, a backend developer in Kathmandu and a BCS undergraduate specialising in Data Science. I work on APIs, databases, and authentication by day, and build full-stack and real-time projects around them.",
  primaryCta: { label: "Explore My Work", href: "#portfolio" },
  secondaryCta: { label: "See My Experience", href: "#experience" },
  image: "/images/w.jpg",
  badges: [
    { emoji: "🏆", label: "Best Capstone 2025" },
    { emoji: "🎓", label: "CGPA 3.65" },
  ],
} as const;

export const aboutContent = {
  title: "About Me & Skills",
  body: "Determined and thorough, with practical experience across full-stack web development and the basics of machine learning — built on real projects rather than coursework alone.",
  storyTitle: "My Story & Mission",
  storyBody1:
    "I am a BCS undergraduate at IIMS College, studying towards a Taylor's University degree specialising in Data Science. Alongside it I have worked as a backend developer, a frontend developer on internal CRM and HRMS tools, and on data operations — so I have seen a product from more than one side.",
  storyBody2:
    "I care about software development principles, user-friendly design, and solving problems that actually exist. What I want to build is scalable, user-centred work where the technology produces a real practical result.",
  skillsTitle: "My Tech Stack",
  /** Every figure here is traceable to the CV. */
  stats: [
    { value: "5", label: "Projects Built" },
    { value: "3", label: "Awards Received" },
    { value: "3.65", label: "CGPA" },
    { value: "3", label: "Companies" },
  ],
} as const;

export const servicesContent = {
  title: "What I Work On",
  body: "The areas I have shipped in — backend and API work, full-stack builds, real-time systems, and the data side of my degree.",
} as const;

export const experienceContent = {
  title: "Experience & Education",
  body: "Where I have worked, what I studied, and the work that has been recognised along the way.",
  educationTitle: "Education",
  awardsTitle: "Awards & Recognition",
} as const;

export const portfolioContent = {
  title: "Featured Projects",
  body: "Things I have built, from an award-winning emergency alert system to full-stack platforms and dashboards.",
} as const;

export const ctaContent = {
  eyebrow: "Email is the fastest way to reach me",
  title: "Have a project that needs\na solid backend?",
  body: "I build APIs, full-stack applications, and real-time features that hold up in use. If you have a project or a problem worth solving, tell me about it.",
  cta: { label: "Start a Conversation", href: "#contact" },
} as const;

export const contactContent = {
  title: "Get in Touch",
  body: "Have a project in mind or want to collaborate? Send a message below and I'll get back to you as soon as I can.",
  sidebarTitle: "Contact Information",
  sidebarBody:
    "Feel free to reach out directly by email, or find me on GitHub and LinkedIn to see what I'm building.",
} as const;

export const footerContent = {
  tagline:
    "Backend developer and BCS undergraduate in Kathmandu. I build APIs, full-stack web applications, and real-time tools that solve practical problems.",
} as const;
