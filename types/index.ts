export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

/**
 * No `level` field on purpose. A self-assessed "85%" reads as a measurement
 * and nothing on the CV backs one, so the About section lists the stack
 * without a score.
 */
export interface Skill {
  name: string;
  category: string;
}

/** One employer. Several stints at the same place are `roles`, newest first. */
export interface Experience {
  id: string;
  company: string;
  location: string;
  roles: { title: string; period: string; current?: boolean }[];
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  qualification: string;
  /** Partner institution, specialisation — anything that needs a second line. */
  detail?: string;
  period: string;
  score: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
