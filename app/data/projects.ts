import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "XXXX - In Development",
    description: "NA",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/username/project",
    demoType: "video",
    demoContent: {
      videoUrl: "/demos/project-management.mp4"
    }
  },
  {
    title: "CrossCourt",
    description: "Community platform for tennis players to connect and schedule matches.",
    tech: ["Next.js", "Stripe", "MongoDB", "TypeScript"],
    github: "https://github.com/username/ecommerce",
    demoType: "sandbox",
    demoContent: {
      sandboxUrl: "https://codesandbox.io/embed/your-sandbox-id"
    }
  },
  {
    title: "ProConnect",
    description: "Information sharing platform that connects professionals with industry-specific resources and tools.",
    tech: ["Python", "FastAPI", "React", "OpenAI"],
    live: "https://your-deployed-app.com",
    demoType: "code",
    demoContent: {
        codeUrl: "https://github.com/username/ai-generator/blob/main/app.py"
      }
  },
  {
    title: "InSpread",
    description: "Investment tracking platform that provides real-time market data and portfolio analysis tools.",
    tech: ["Vue", "Express", "MongoDB", "Docker"],
    github: "www.github.com",
    demoType: "live",
    demoContent: {
      liveUrl: "https://your-deployed-app.com"
    }
  },
  {
    title: "Yieldr (formerly SeedMoney)",
    description: "Government grant application platform for farmers.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    github: "www.github.com",
    demoType: "video",
    demoContent: {
      videoUrl: "/demos/crowdfunding.mp4"
    }
  }
];