'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Building2, ChevronRight, ExternalLink, Link as LinkIcon, Video, Github } from 'lucide-react';
import { Experience, RelatedContent } from '@/types/experience';

interface CardContentProps {
  experience: Experience;
  isExpanded: boolean;
  onToggle: (e: React.MouseEvent) => void;
  alignment?: 'left' | 'right';
  size?: 'normal' | 'compact';
}

const RelatedContentCard = ({ content }: { content: RelatedContent }) => {
  const icons = {
    blog: <LinkIcon className="w-4 h-4" />,
    video: <Video className="w-4 h-4" />,
    github: <Github className="w-4 h-4" />,
    link: <LinkIcon className="w-4 h-4" />,
    image: <LinkIcon className="w-4 h-4" />
  };

  return (
    <a
      href={content.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 rounded-lg bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 hover:border-blue-500/20 transition-colors group"
    >
      <div className="flex items-start gap-2 mb-1">
        <div className="text-blue-500 mt-0.5">{icons[content.type]}</div>
        <div className="flex-1 min-w-0">
          <h5 className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {content.title}
          </h5>
          {content.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
              {content.description}
            </p>
          )}
        </div>
        <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0 mt-1" />
      </div>
    </a>
  );
};

export function CardContent({ experience, isExpanded, onToggle, alignment = 'left', size = 'normal' }: CardContentProps) {
  const isCompact = size === 'compact';
  const isRight = alignment === 'right';

  return (
    <>
      {/* Year badge */}
      <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-3">
        {experience.year}
      </div>

      {/* Title and company */}
      <h3 className={`${isCompact ? 'text-lg' : 'text-xl'} font-bold text-gray-900 dark:text-white mb-2`}>
        {experience.title}
      </h3>
      <div className={`flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3 ${isRight ? 'justify-end' : 'justify-start'}`}>
        <Building2 className="w-4 h-4" />
        <span>{experience.company}</span>
      </div>

      {/* Meta info */}
      <div className={`flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4 ${isRight ? 'justify-end' : 'justify-start'}`}>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {experience.location}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {experience.period}
        </div>
      </div>

      {/* Description */}
      <p className={`text-gray-700 dark:text-gray-300 mb-4 ${isCompact ? 'text-sm' : ''}`}>
        {experience.description}
      </p>

      {/* Expandable section */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
          {/* Achievements */}
          <div>
            <h4 className={`font-semibold text-gray-900 dark:text-white mb-3 ${isCompact ? 'text-sm' : ''} ${isRight ? 'text-right' : 'text-left'}`}>
              Key Achievements
            </h4>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 ${isRight ? 'flex-row-reverse text-right' : ''}`}
                >
                  <ChevronRight className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          {experience.tech && experience.tech.length > 0 && (
            <div>
              <h4 className={`font-semibold text-gray-900 dark:text-white mb-3 ${isCompact ? 'text-sm' : ''} ${isRight ? 'text-right' : 'text-left'}`}>
                Technologies
              </h4>
              <div className={`flex flex-wrap gap-2 ${isRight ? 'justify-end' : 'justify-start'}`}>
                {experience.tech.map((tech, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Related Content */}
          {experience.relatedContent && experience.relatedContent.length > 0 && (
            <div>
              <h4 className={`font-semibold text-gray-900 dark:text-white mb-3 ${isCompact ? 'text-sm' : ''} ${isRight ? 'text-right' : 'text-left'}`}>
                Related Content
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {experience.relatedContent.map((content, i) => (
                  <RelatedContentCard key={i} content={content} />
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {experience.links && experience.links.length > 0 && (
            <div className={`flex flex-wrap gap-2 ${isRight ? 'justify-end' : 'justify-start'}`}>
              {experience.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Expand toggle */}
      <button
        className={`mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 ${isRight ? 'ml-auto' : ''}`}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? 'Show less details' : 'Show more details'}
      >
        {isExpanded ? 'Show less' : 'Show more'}
        <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </button>
    </>
  );
}

