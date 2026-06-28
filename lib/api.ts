import { Project, Testimonial, Service, Skill, NavLink, SocialLink } from "../types";

export interface BackendNavLink {
  id: string;
  label: string;
  href: string;
  external: boolean;
  enabled: boolean;
  order: number;
}

export interface BackendSocialLink {
  id: string;
  label: string;
  url: string;
  iconName: string | null;
  enabled: boolean;
  order: number;
}

export interface BackendService {
  id: string;
  title: string;
  slug: string;
  description: string;
  details: string | null;
  features: string[];
  iconName: string | null;
  featured: boolean;
  enabled: boolean;
  order: number;
}

export interface BackendProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string | null;
  tags: string[];
  imageUrl: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
  featured: boolean;
  order: number;
}

export interface BackendTestimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  avatarUrl: string | null;
  featured: boolean;
  enabled: boolean;
  order: number;
}

export interface BackendSkill {
  id: string;
  name: string;
  category: string;
  description: string | null;
  iconName: string | null;
  proficiency: number | null;
  featured: boolean;
  enabled: boolean;
  order: number;
}

export interface BackendSiteContent {
  id: string;
  key: string;
  eyebrow: string | null;
  title: string;
  subtitle: string | null;
  body: string | null;
  imageUrl: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
  secondaryCtaLabel: string | null;
  secondaryCtaUrl: string | null;
  metadata: Record<string, any>;
  enabled: boolean;
  order: number;
}

export interface HomepageResponse {
  navigation: BackendNavLink[];
  sections: Record<string, BackendSiteContent>;
  projects: BackendProject[];
  skills: BackendSkill[];
  services: BackendService[];
  testimonials: BackendTestimonial[];
  socialLinks: BackendSocialLink[];
}

export function mapHomepageData(data: HomepageResponse) {
  const navigation: NavLink[] = (data.navigation || [])
    .filter((n) => n.enabled)
    .map((n) => ({
      label: n.label,
      href: n.href,
    }));

  const socialLinks: SocialLink[] = (data.socialLinks || [])
    .filter((s) => s.enabled)
    .map((s) => ({
      label: s.label,
      href: s.url,
      icon: (s.iconName || s.label || "github").toLowerCase(),
    }));

  const services: Service[] = (data.services || [])
    .filter((s) => s.enabled)
    .map((s) => ({
      id: s.id,
      icon: s.iconName || "code",
      title: s.title,
      description: s.description,
      features: s.features || [],
    }));

  const projects: Project[] = (data.projects || []).map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.imageUrl || "/images/project-saas.png",
    techStack: p.tags || [],
    liveUrl: p.liveUrl || "#",
    githubUrl: p.repoUrl || "#",
    category: p.tags && p.tags.length > 0 ? p.tags[0] : "Web App", // backend has no category; default to first tag or Web App
  }));

  const testimonials: Testimonial[] = (data.testimonials || [])
    .filter((t) => t.enabled)
    .map((t) => ({
      id: t.id,
      name: t.name,
      position: t.role || "Client",
      company: t.company || "",
      review: t.quote,
      rating: 5, // backend has no rating field; default to 5
      avatar:
        t.avatarUrl ||
        t.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
    }));

  const skills: Skill[] = (data.skills || [])
    .filter((s) => s.enabled)
    .map((s) => ({
      name: s.name,
      level: s.proficiency ?? 100,
      category: s.category,
    }));

  return {
    navigation,
    socialLinks,
    services,
    projects,
    testimonials,
    skills,
    sections: data.sections || {},
  };
}

export async function fetchHomepageData(): Promise<HomepageResponse | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${apiUrl}/homepage`, {
      next: { revalidate: 60 }, // cache for 60 seconds
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching homepage data from NestJS API:", error);
    return null;
  }
}
