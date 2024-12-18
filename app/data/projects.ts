import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Project Management Dashboard",
    description: "A full-stack application built with React and Node.js that helps teams track project progress and collaborate effectively.",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/username/project",
    demoType: "video",
    demoContent: {
      videoUrl: "/demos/project-management.mp4"
    }
  },
  {
    title: "E-commerce Platform",
    description: "Modern e-commerce solution with real-time inventory management and secure payment processing.",
    tech: ["Next.js", "Stripe", "MongoDB", "TypeScript"],
    github: "https://github.com/username/ecommerce",
    demoType: "sandbox",
    demoContent: {
      sandboxUrl: "https://codesandbox.io/embed/your-sandbox-id"
    }
  },
  {
    title: "AI Content Generator",
    description: "Web application that leverages machine learning APIs to generate and optimize content for various purposes.",
    tech: ["Python", "FastAPI", "React", "OpenAI"],
    live: "https://your-deployed-app.com",
    demoType: "code",
    demoContent: {
      codeUrl: "https://github.com/username/ai-generator/blob/main/app.py"
    }
  }
];