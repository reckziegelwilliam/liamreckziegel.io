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
  name: 'Liam Reckziegel',
  title: 'Founding Engineer & Product Partner',
  description: 'I rebuild broken apps, ship new products, and design systems that last. 6+ years turning 0→1 ideas into production-ready platforms. I\'ve rebuilt 3 failing apps, shipped 50+ sites through my studio, and scaled systems to thousands of concurrent users.'
};