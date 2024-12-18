import React from 'react';
import { ProjectCard } from './project-card';
import { Project } from '@/types/project';

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section>
      <h2 className="font-bold text-2xl mb-6 tracking-tighter">
        Featured Projects
      </h2>
      <div className="grid gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}