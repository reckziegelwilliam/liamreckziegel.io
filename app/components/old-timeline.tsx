'use client';

import React, { useEffect, useState, useCallback } from 'react';

const Timeline = () => {
  // Previous state declarations remain the same
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(-1);
  const [windowWidth, setWindowWidth] = useState(0);
  
  const timelineEvents = [
    { year: 2020, title: 'Project Alpha', description: 'Led development of a revolutionary web application' },
    { year: 2021, title: 'Project Beta', description: 'Architected scalable cloud infrastructure' },
    { year: 2022, title: 'Project Gamma', description: 'Implemented AI-driven analytics platform' },
    { year: 2023, title: 'Project Delta', description: 'Developed blockchain integration system' },
    { year: 2024, title: 'Project Epsilon', description: 'Created next-gen mobile experience' }
  ];

  // Previous useEffect for window resize remains the same
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculatePathDimensions = useCallback((progress: number) => {
    const maxWidth = windowWidth;
    const maxHeight = window.innerHeight;
    const expansionProgress = Math.min(1, (progress / 15)); // First 15% of scroll
    
    return {
      width: maxWidth,
      height: maxHeight * 0.7,
      scale: expansionProgress, // Use scale instead of changing dimensions
      opacity: Math.min(1, progress / 10)
    };
  }, [windowWidth]);

  const calculateTunnelCircle = useCallback((index: number, progress: number) => {
    // Only start tunnel effect after triangle begins expanding (around 5% scroll)
    const tunnelDelay = Math.max(0, progress - 5);
    const tunnelProgress = Math.min(1, tunnelDelay / 10); // Complete tunnel appearance over next 10%
    
    const spacing = Math.pow(1.2, index) * 50;
    const depth = -spacing - (progress * 8);
    const baseSize = 8;
    const sizeIncrease = Math.pow(1.15, index) * baseSize;
    
    // Modify opacity to consider tunnel appearance timing
    const opacityDecrease = Math.max(0, 1 - (index * 0.03) - (progress * 0.002));
    const tunnelOpacity = tunnelProgress * opacityDecrease;
    
    return {
      size: sizeIncrease,
      depth,
      opacity: tunnelOpacity
    };
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

  const pathDimensions = calculatePathDimensions(scrollProgress);

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
          {/* Enhanced Tunnel Effect */}
          <div className="absolute inset-0 flex items-center justify-center -top-1/3">
            {[...Array(30)].map((_, i) => {
              const circle = calculateTunnelCircle(i, scrollProgress);
              
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    width: `${circle.size}px`,
                    height: `${circle.size}px`,
                    transform: `translateZ(${circle.depth}px)`,
                    opacity: circle.opacity,
                    transition: 'all 0.3s ease-out',
                  }}
                >
                  {/* Inner glow */}
                  <div className="w-full h-full rounded-full bg-blue-500 animate-pulse" />
                  {/* <div className="absolute inset-0 rounded-full bg-blue-400 blur-xl animate-pulse" /> */}
                  {/* <div className="absolute inset-0 rounded-full bg-blue-300 blur-2xl animate-pulse" /> */}
                </div>
              );
            })}
          </div>

          {/* Expanding Cone */}
          <div 
            className="absolute top-1/3 left-1/2 -translate-x-1/2"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `translateZ(${-200 - scrollProgress * 2}px)`,
              transformOrigin: 'top'
            }}
          >
            <svg
              width={pathDimensions.width}
              height={pathDimensions.height}
              style={{
                transform: `translateX(-50%) scale(${pathDimensions.scale})`,
                transformOrigin: '50% 0%', // Ensure scaling happens from the top center
                opacity: pathDimensions.opacity,
                transition: 'transform 0.5s ease-out'
              }}
            >
              <defs>
                <linearGradient id="coneGradient" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Filled Triangle */}
              <path
                d={`
                  M ${pathDimensions.width / 2},0
                  L ${pathDimensions.width},${pathDimensions.height}
                  L 0,${pathDimensions.height}
                  Z
                `}
                fill="url(#coneGradient)"
                filter="url(#glow)"
              />

              {/* Outline */}
              <path
                d={`
                  M ${pathDimensions.width / 2},0
                  L ${pathDimensions.width},${pathDimensions.height}
                  L 0,${pathDimensions.height}
                  Z
                `}
                stroke="rgba(59, 130, 246, 0.5)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>

          {/* Central Point */}
          <div 
            className="absolute top-1/3 left-1/2 -translate-x-1/2"
            style={{
              transform: `translate(-50%, 0) translateZ(${-200 - scrollProgress * 2}px)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="relative w-8 h-8">
              <div className="w-full h-full rounded-full bg-blue-500 animate-pulse" />
              {/* <div className="absolute inset-0 rounded-full bg-blue-400 blur-xl animate-pulse" /> */}
              {/* <div className="absolute inset-0 rounded-full bg-blue-300 blur-2xl animate-pulse" /> */}
            </div>
          </div>

          {timelineEvents.map((event, index) => {
            const side = index % 2 === 0 ? 1 : -1;
            const adjustedScrollProgress = Math.max(0, scrollProgress - 15);
            // Only render cards if we're past the initial expansion phase
            if (adjustedScrollProgress <= 0) return null;
                    
            const progress = (adjustedScrollProgress / 85) * timelineEvents.length - index;
            const isVisible = progress >= 0 && progress <= 1.2; // Adjusted visibility threshold
            const depth = progress * -1000;
            const scale = Math.max(0.5, 1 - Math.abs(progress - 0.5) * 0.5);
                    
            // Only render if visible
            if (!isVisible) return null;
                    
            return (
              <div
                key={index}
                className="absolute top-1/3 left-1/2"
                style={{
                  transform: `
                    translate(-50%, ${100 + depth * 0.1}px)
                    translateX(${side * (300 + Math.abs(depth) * 0.2)}px)
                    translateZ(${depth}px)
                    scale(${scale})
                    rotateY(${-side * Math.min(30, Math.abs(depth) * 0.02)}deg)
                  `,
                  opacity: Math.max(0, 1 - Math.abs(progress - 0.5)),
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.6s ease-out'
                }}
              >
                <div 
                  className="w-80 p-6 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)',
                  }}
                >
                  <div className="text-4xl font-bold text-blue-400 mb-3">{event.year}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-blue-100">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;