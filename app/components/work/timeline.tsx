'use client';

import { useEffect, useState, useCallback } from 'react';
import { TunnelEffect } from './tunnel-effect';
import { TimelineCone } from './timeline-cone';
import { CentralPoint } from './central-point';
import { TimelineCards } from './timeline-cards';
import { calculatePathDimensions } from '../../utils/work';
import { timelineEvents } from './timeline-events';
import type { TimelineEvent } from '../../utils/types';

const Timeline: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(-1);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let frameId: number;
    
    const handleScroll = () => {
      frameId = requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = Math.min(100, (window.scrollY / maxScroll) * 100);
        setScrollProgress(currentProgress);

        const adjustedProgress = Math.max(0, currentProgress - 15);
        const cardIndex = Math.floor((adjustedProgress / 85) * timelineEvents.length);
        setActiveCardIndex(Math.min(cardIndex, timelineEvents.length - 1));
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const pathDimensions = calculatePathDimensions(scrollProgress, windowWidth);

  return (
    <div className="relative min-h-[500vh] w-full">
      <div 
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
        style={{ 
          perspective: '1500px',
          perspectiveOrigin: '50% 30%'
        }}
      >
        <div 
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <TunnelEffect scrollProgress={scrollProgress} />
          <TimelineCone scrollProgress={scrollProgress} pathDimensions={pathDimensions} />
          <CentralPoint scrollProgress={scrollProgress} />
          <TimelineCards events={timelineEvents} scrollProgress={scrollProgress} />
        </div>
      </div>
    </div>
  );
};

export default Timeline;