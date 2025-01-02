'use client';

import { useEffect, useState, useCallback } from 'react';
import { TunnelEffect } from './tunnel-effect';
import { TimelineCone } from './timeline-cone';
import { CentralPoint } from './central-point';
import { TimelineCards } from './timeline-cards';
import { calculatePathDimensions } from '@/app/utils/calculations';
import { experience } from '@/data/experience';

const Timeline: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(-1);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let frameId: number;
    
    const handleScroll = () => {
      frameId = requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = Math.min(100, (window.scrollY / maxScroll) * 100);
        setScrollProgress(currentProgress);
  
        const cardTransitionSpace = 25;
        const adjustedProgress = Math.max(0, currentProgress - 10);
        const cardIndex = Math.floor(adjustedProgress / cardTransitionSpace);
        setActiveCardIndex(Math.min(cardIndex, experience.length - 1));
      });
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isClient]);

  if (!isClient) return null;

  const pathDimensions = calculatePathDimensions(scrollProgress, windowWidth)

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
          {/* Background elements */}
          <div className="z-10">
            <TunnelEffect scrollProgress={scrollProgress} />
          </div>
          
          {/* Cone with adjusted opacity */}
          <div className="z-20">
            <TimelineCone 
              scrollProgress={scrollProgress}
              pathDimensions={pathDimensions}
            />
          </div>
  
          {/* Center point */}
          <div className="z-30">
            <CentralPoint scrollProgress={scrollProgress} />
          </div>
  
          {/* Cards on top */}
          <div className="z-40">
            <TimelineCards 
              events={experience} 
              scrollProgress={scrollProgress} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;