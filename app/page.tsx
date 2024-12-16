import React from 'react';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Project Management Dashboard",
    description: "A full-stack application built with React and Node.js that helps teams track project progress and collaborate effectively.",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    github: "#",
    live: "#"
  },
  {
    title: "E-commerce Platform",
    description: "Modern e-commerce solution with real-time inventory management and secure payment processing.",
    tech: ["Next.js", "Stripe", "MongoDB", "TypeScript"],
    github: "#",
    live: "#"
  },
  {
    title: "AI Content Generator",
    description: "Web application that leverages machine learning APIs to generate and optimize content for various purposes.",
    tech: ["Python", "FastAPI", "React", "OpenAI"],
    github: "#",
    live: "#"
  }
];

const skills = [
  "JavaScript/TypeScript",
  "React/Next.js",
  "Node.js",
  "Python",
  "SQL/NoSQL",
  "AWS",
  "Docker",
  "Git"
];

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="font-bold text-4xl mb-4 tracking-tighter">
          John Doe
        </h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Full Stack Software Engineer
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          I build accessible, scalable web applications with modern technologies.
          Currently focused on building robust full-stack solutions at TechCorp.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="flex items-center hover:text-gray-600">
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </a>
          <a href="#" className="flex items-center hover:text-gray-600">
            <Linkedin className="w-5 h-5 mr-2" />
            LinkedIn
          </a>
          <a href="#" className="flex items-center hover:text-gray-600">
            <Mail className="w-5 h-5 mr-2" />
            Email
          </a>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="font-bold text-2xl mb-6 tracking-tighter">
          Skills & Technologies
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <h2 className="font-bold text-2xl mb-6 tracking-tighter">
          Featured Projects
        </h2>
        <div className="grid gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg"
            >
              <h3 className="font-semibold text-xl mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <a
                  href={project.github}
                  className="flex items-center text-sm hover:text-gray-600"
                >
                  <Github className="w-4 h-4 mr-1" />
                  Code
                </a>
                <a
                  href={project.live}
                  className="flex items-center text-sm hover:text-gray-600"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}