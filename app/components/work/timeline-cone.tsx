import { PathDimensions } from '../../utils/types';

interface TimelineConeProps {
  scrollProgress: number;
  pathDimensions: PathDimensions;
}

export const TimelineCone: React.FC<TimelineConeProps> = ({ scrollProgress, pathDimensions }) => {
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
          transition: 'transform 0.5s ease-out'
        }}
      >
        <defs>
          {/* Gradient definition for cone fill */}
          <linearGradient 
            id="coneGradient" 
            x1="50%" 
            y1="0%" 
            x2="50%" 
            y2="100%"
          >
            <stop 
              offset="0%" 
              stopColor="rgb(59, 130, 246)" 
              stopOpacity="0.4" 
            />
            <stop 
              offset="100%" 
              stopColor="rgb(59, 130, 246)" 
              stopOpacity="0" 
            />
          </linearGradient>

          {/* Glow effect filter */}
          <filter id="glow">
            <feGaussianBlur 
              stdDeviation="5" 
              result="coloredBlur" 
            />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Filled Triangle with gradient and glow */}
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

        {/* Triangle outline */}
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
  );
};