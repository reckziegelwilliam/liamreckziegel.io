import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, Calendar, Building2 } from 'lucide-react';

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

const experience = [
  {
    title: "Senior Software Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    period: "2022 - Present",
    description: "Lead developer for the company's flagship product, managing a team of 5 engineers and architecting scalable solutions.",
    achievements: [
      "Reduced API response time by 40% through optimization",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Led migration from monolith to microservices architecture"
    ]
  },
  {
    title: "Software Engineer",
    company: "StartupHub",
    location: "Remote",
    period: "2020 - 2022",
    description: "Full-stack developer working on customer-facing applications and internal tools.",
    achievements: [
      "Developed real-time collaboration features using WebSocket",
      "Built analytics dashboard increasing user engagement by 25%",
      "Mentored 3 junior developers"
    ]
  },
  {
    title: "Junior Developer",
    company: "CodeCraft",
    location: "Boston, MA",
    period: "2018 - 2020",
    description: "Worked on frontend development and UI/UX improvements.",
    achievements: [
      "Implemented responsive design across all company products",
      "Reduced page load time by 30% through optimization",
      "Created reusable component library"
    ]
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

      {/* Work Experience Section */}
      <section className="mb-16">
        <h2 className="font-bold text-2xl mb-6 tracking-tighter">
          Work Experience
        </h2>
        <div className="space-y-8">
          {experience.map((job, index) => (
            <div key={index} className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-800">
              <div className="absolute -left-2 top-0">
                <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {job.period}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
                  <Building2 className="w-4 h-4 mr-1" />
                  {job.company} • {job.location}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {job.description}
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm">{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
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