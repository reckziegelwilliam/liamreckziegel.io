import { calculateTunnelCircle } from '@/app/utils/calculations';
interface TunnelEffectProps {
  scrollProgress: number;
}

export const TunnelEffect: React.FC<TunnelEffectProps> = ({ scrollProgress }) => {
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center -top-1/3"
      style={{
        zIndex: 0,
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
      }}
    >
      {[...Array(35)].map((_, i) => {
        const circle = calculateTunnelCircle(i, scrollProgress, windowWidth);
        
        // Consistent color with distance-based intensity
        const blueValue = Math.round(130 * circle.colorIntensity);
        const color = `rgb(59, ${blueValue}, 246)`;
        
        return (
          <div
            key={i}
            className="absolute"
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              transform: `translateZ(${circle.depth}px)`,
              opacity: circle.opacity,
              transition: 'all 0.25s ease-out',
            }}
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                backgroundColor: color,
                boxShadow: '0 0 4px rgba(59, 130, 246, 0.3)',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};