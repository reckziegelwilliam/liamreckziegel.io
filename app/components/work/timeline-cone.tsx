import { PathDimensions } from '@/types/timeline';

interface TimelineConeProps {
  scrollProgress: number;
  pathDimensions: PathDimensions;
}

export const TimelineCone: React.FC<TimelineConeProps> = ({ scrollProgress, pathDimensions }) => {
  // Calculate dynamic glow intensity based on scroll
  const glowIntensity = Math.min(8 + (scrollProgress * 0.1), 12);
  const innerGlowIntensity = Math.min(3 + (scrollProgress * 0.05), 5);

  return (
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
          transformOrigin: '50% 0%',
          opacity: pathDimensions.opacity,
          transition: 'all 0.5s ease-out'
        }}
      >
        <defs>
          {/* Enhanced radial gradient for depth effect */}
          <radialGradient 
            id="depthGradient" 
            cx="50%" 
            cy="0%" 
            r="100%" 
            fx="50%" 
            fy="0%"
          >
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.6" />
            <stop offset="40%" stopColor="rgb(59, 130, 246)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
          </radialGradient>

          {/* Primary cone gradient */}
          <linearGradient 
            id="coneGradient" 
            x1="50%" 
            y1="0%" 
            x2="50%" 
            y2="100%"
          >
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.5" />
            <stop offset="30%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
          </linearGradient>

          {/* Enhanced outer glow */}
          <filter id="outerGlow">
            <feGaussianBlur 
              stdDeviation={glowIntensity} 
              result="outerBlur"
            />
            <feComposite
              in="outerBlur"
              in2="SourceGraphic"
              operator="over"
            />
          </filter>

          {/* Inner glow for depth */}
          <filter id="innerGlow">
            <feGaussianBlur 
              stdDeviation={innerGlowIntensity} 
              result="innerBlur"
            />
            <feComposite
              in="innerBlur"
              in2="SourceGraphic"
              operator="in"
            />
          </filter>

          {/* Composite filter for combined effects */}
          <filter id="combinedEffect">
            <feMorphology
              operator="dilate"
              radius="2"
              result="thickened"
            />
            <feGaussianBlur
              stdDeviation={glowIntensity}
              result="blurred"
            />
            <feFlood
              floodColor="rgb(59, 130, 246)"
              floodOpacity="0.3"
              result="glowColor"
            />
            <feComposite
              in="glowColor"
              in2="blurred"
              operator="in"
              result="softGlow"
            />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background shape for depth effect */}
        <path
          d={`
            M ${pathDimensions.width / 2},0
            Q ${pathDimensions.width * 0.75},${pathDimensions.height * 0.3} 
              ${pathDimensions.width},${pathDimensions.height}
            L 0,${pathDimensions.height}
            Q ${pathDimensions.width * 0.25},${pathDimensions.height * 0.3} 
              ${pathDimensions.width / 2},0
          `}
          fill="url(#depthGradient)"
          filter="url(#innerGlow)"
          opacity="0.5"
        />

        {/* Main cone with curved edges */}
        <path
          d={`
            M ${pathDimensions.width / 2},0
            Q ${pathDimensions.width * 0.75},${pathDimensions.height * 0.3} 
              ${pathDimensions.width},${pathDimensions.height}
            L 0,${pathDimensions.height}
            Q ${pathDimensions.width * 0.25},${pathDimensions.height * 0.3} 
              ${pathDimensions.width / 2},0
          `}
          fill="url(#coneGradient)"
          filter="url(#combinedEffect)"
        />

        {/* Outer edge highlight */}
        <path
          d={`
            M ${pathDimensions.width / 2},0
            Q ${pathDimensions.width * 0.75},${pathDimensions.height * 0.3} 
              ${pathDimensions.width},${pathDimensions.height}
            L 0,${pathDimensions.height}
            Q ${pathDimensions.width * 0.25},${pathDimensions.height * 0.3} 
              ${pathDimensions.width / 2},0
          `}
          stroke="rgba(59, 130, 246, 0.4)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#outerGlow)"
        />
      </svg>
    </div>
  );
};