export interface SectionMeta {
  id: string;
  index: number;
  label: string;
  kickerNumber: string;
  kickerLabel: string;
  poster: string;
  video?: string;
  title: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  year: string;
  link?: string;
  github?: string;
  role: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level?: string }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
}

export type ActiveModal = 'none' | 'contact' | 'impressum' | 'privacy' | 'techAudit';
