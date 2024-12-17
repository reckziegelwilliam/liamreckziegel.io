import { TimelineEvent } from '../../types/timeline';

interface TimelineCardsProps {
  events: TimelineEvent[];
  scrollProgress: number;
}

export const TimelineCards: React.FC<TimelineCardsProps> = ({ events, scrollProgress }) => {
  return (
    <>
      {events.map((event, index) => {
        const side = index % 2 === 0 ? 1 : -1;
        const adjustedScrollProgress = Math.max(0, scrollProgress - 15);
        
        // Don't render any cards until initial expansion is complete
        if (adjustedScrollProgress <= 0) return null;
        
        // Calculate progress and visibility
        const progress = (adjustedScrollProgress / 85) * events.length - index;
        const isVisible = progress >= 0 && progress <= 1.2;
        
        // Don't render if card isn't visible
        if (!isVisible) return null;
        
        // Calculate transform values
        const depth = progress * -1000;
        const scale = Math.max(0.5, 1 - Math.abs(progress - 0.5) * 0.5);
        const horizontalOffset = side * (300 + Math.abs(depth) * 0.2);
        const verticalOffset = 100 + depth * 0.1;
        const rotation = -side * Math.min(30, Math.abs(depth) * 0.02);
        const opacity = Math.max(0, 1 - Math.abs(progress - 0.5));
        
        return (
          <div
            key={index}
            className="absolute top-1/3 left-1/2"
            style={{
              transform: `
                translate(-50%, ${verticalOffset}px)
                translateX(${horizontalOffset}px)
                translateZ(${depth}px)
                scale(${scale})
                rotateY(${rotation}deg)
              `,
              opacity,
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
              <div className="text-4xl font-bold text-blue-400 mb-3">
                {event.year}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {event.title}
              </h3>
              <p className="text-blue-100">
                {event.description}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};