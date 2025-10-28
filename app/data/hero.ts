import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { SocialLink } from '@/app/types/skill';

export const socialLinks: SocialLink[] = [
  { 
    platform: 'GitHub', 
    url: 'https://github.com/reckziegelwilliam', 
    icon: Github 
  },
  { 
    platform: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/william-reckziegel/', 
    icon: Linkedin 
  },
  { 
    platform: 'Twitter', 
    url: 'https://x.com/liamreckziegel', 
    icon: Twitter 
  },
  { 
    platform: 'Email', 
    url: 'mailto:reckziegel.william@gmail.com', 
    icon: Mail 
  }
];

export const heroData = {
  name: 'William // Liam // Reckziegel',
  title: 'Software Engineer',
  description: 'Versatile Software Engineer with 6+ years in full-stack development and cloud architecture. Proven success in rebuilding apps, launching MVPs, and scaling systems from concept to production. Adept at balancing speed and reliability in startup, agency, and enterprise environments.'
};