export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ElementType;
}

export interface Skill {
  name: string;
  icon?: React.ElementType;
  level?: number;  // 1-5 for skill proficiency
  category: 'frontend' | 'backend' | 'devops' | 'other';
}
