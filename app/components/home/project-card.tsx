import { useState } from 'react';
import { Github, ExternalLink, Code, Play, Pause, Globe, Codesandbox } from 'lucide-react';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const renderDemoPreview = () => {
    if (!isPreviewOpen) return null;

    switch (project.demoType) {
      case 'video':
        return (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
            <video
              src={project.demoContent.videoUrl}
              className="w-full h-full object-cover"
              controls={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/60 transition-colors"
              >
                <Play className="w-12 h-12 text-white" />
              </button>
            )}
          </div>
        );

      case 'code':
        return (
          <div className="w-full h-96 mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
            <iframe
              src={`${project.demoContent.codeUrl}?embed=1`}
              className="w-full h-full"
              title={`${project.title} code preview`}
            />
          </div>
        );

      case 'sandbox':
        return (
          <div className="w-full h-96 mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
            <iframe
              src={project.demoContent.sandboxUrl}
              className="w-full h-full"
              title={`${project.title} sandbox preview`}
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
          </div>
        );

      case 'live':
        return (
          <div className="w-full h-96 mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
            <iframe
              src={project.demoContent.liveUrl}
              className="w-full h-full"
              title={`${project.title} live preview`}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const renderDemoButton = () => {
    const buttonProps = {
      onClick: () => setIsPreviewOpen(!isPreviewOpen),
      className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    };

    switch (project.demoType) {
      case 'video':
        return (
          <button {...buttonProps}>
            <Play className="w-4 h-4" />
            Watch Demo
          </button>
        );
      case 'code':
        return (
          <button {...buttonProps}>
            <Code className="w-4 h-4" />
            View Code
          </button>
        );
      case 'sandbox':
        return (
          <button {...buttonProps}>
            <Codesandbox className="w-4 h-4" />
            Try Demo
          </button>
        );
      case 'live':
        return (
          <button {...buttonProps}>
            <Globe className="w-4 h-4" />
            Live Preview
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
      <h3 className="font-semibold text-xl mb-2">{project.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {project.description}
      </p>
      
      {renderDemoPreview()}

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

      <div className="flex flex-wrap gap-4">
        {renderDemoButton()}
        
        {project.github && (
          <a
            href={project.github}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Github className="w-4 h-4" />
            Code
          </a>
        )}
        
        {project.live && (
          <a
            href={project.live}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Visit
          </a>
        )}
      </div>
    </div>
  );
}