'use client';

import { useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Experience } from '@/types/experience';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { CardContent } from './card-content';

interface TimelineCardProps {
  experience: Experience;
  index: number;
}

export function TimelineCard({ experience, index }: TimelineCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const isEven = index % 2 === 0;
  const cardId = `timeline-card-${experience.year}-${experience.company.toLowerCase().replace(/\s+/g, '-')}`;
  const detailsId = `${cardId}-details`;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // Memoize card class names
  const cardClassName = useMemo(() => {
    const base = 'p-6 rounded-xl border-2 cursor-pointer transition-all duration-300';
    const viewState = isInView 
      ? 'bg-[#1A1F35] dark:bg-[#1A1F35] border-[#00D9FF]/30 shadow-lg' 
      : 'bg-[#0A0E1A] dark:bg-[#0A0E1A] border-[#1A1F35]';
    const hover = 'hover:shadow-xl hover:border-[#00D9FF]';
    return `${base} ${viewState} ${hover}`;
  }, [isInView]);

  // Mobile layout
  if (isMobile) {
    return (
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0.3, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
        id={cardId}
        aria-labelledby={`${cardId}-title`}
      >
        <div className="flex items-start gap-4 pl-4">
          {/* Timeline dot */}
          <div className="relative flex-shrink-0 pt-2" aria-hidden="true">
            <div
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${isInView 
                  ? 'bg-[#00D9FF] shadow-lg shadow-[#00D9FF]/50' 
                  : 'bg-[#9CA3AF]'
                }
              `}
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 pb-8">
            <motion.div whileHover={{ scale: 1.01 }} className="w-full">
              <div 
                className={cardClassName}
                onClick={() => setIsExpanded(!isExpanded)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsExpanded(!isExpanded);
                  }
                }}
                aria-expanded={isExpanded}
                aria-controls={detailsId}
              >
                <div id={detailsId}>
                  <CardContent 
                    experience={experience}
                    isExpanded={isExpanded}
                    onToggle={handleToggle}
                    alignment="left"
                    size="compact"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Desktop layout
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={{ 
        opacity: isInView ? 1 : 0.3,
        x: isInView ? 0 : (isEven ? -50 : 50)
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
      id={cardId}
      aria-labelledby={`${cardId}-title`}
    >
      <div className={`flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Content side */}
        <div className={`flex-1 ${isEven ? 'text-right' : 'text-left'}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block max-w-xl w-full"
          >
            <div 
              className={cardClassName}
              onClick={() => setIsExpanded(!isExpanded)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsExpanded(!isExpanded);
                }
              }}
              aria-expanded={isExpanded}
              aria-controls={detailsId}
            >
              <div id={detailsId}>
                <CardContent 
                  experience={experience}
                  isExpanded={isExpanded}
                  onToggle={handleToggle}
                  alignment={isEven ? 'right' : 'left'}
                  size="normal"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline dot */}
        <div className="relative flex-shrink-0" aria-hidden="true">
          <div
            className={`
              w-4 h-4 rounded-full border-4 transition-all duration-300
              ${isInView 
                ? 'bg-[#00D9FF] border-[#00D9FF] shadow-lg shadow-[#00D9FF]/50' 
                : 'bg-[#9CA3AF] border-[#9CA3AF]'
              }
            `}
          />
        </div>

        {/* Empty space on other side */}
        <div className="flex-1" />
      </div>
    </motion.article>
  );
}
