import { calculateTunnelCircle } from '../../utils/work';

interface TunnelEffectProps {
  scrollProgress: number;
}

export const TunnelEffect: React.FC<TunnelEffectProps> = ({ scrollProgress }) => {
  return (
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
            <div className="w-full h-full rounded-full bg-blue-500 animate-pulse" />
          </div>
        );
      })}
    </div>
  );
};