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
  description: 'I build accessible, scalable full-stack applications and cloud solutions using modern technologies. 6+ years of experience. Currently focused on crafting scalable web applications that serve communities.'
};