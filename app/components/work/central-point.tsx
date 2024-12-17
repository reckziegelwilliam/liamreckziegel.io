interface CentralPointProps {
  scrollProgress: number;
}

export const CentralPoint: React.FC<CentralPointProps> = ({ scrollProgress }) => {
  return (
    <div 
      className="absolute top-1/3 left-1/2 -translate-x-1/2"
      style={{
        transform: `translate(-50%, 0) translateZ(${-200 - scrollProgress * 2}px)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="relative w-8 h-8">
        <div className="w-full h-full rounded-full bg-blue-500 animate-pulse" />
      </div>
    </div>
  );
};