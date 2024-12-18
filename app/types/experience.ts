export interface RelatedContent {
  type: 'blog' | 'video' | 'image' | 'link' | 'github';
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
}


export interface Experience {
  year: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  tech?: string[];
  links?: { url: string; label: string }[];
  relatedContent?: RelatedContent[];
}