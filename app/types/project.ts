export type DemoType = 'video' | 'code' | 'sandbox' | 'live';

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  demoType: DemoType;
  demoContent: {
    videoUrl?: string;
    codeUrl?: string;
    sandboxUrl?: string;
    liveUrl?: string;
  };
}