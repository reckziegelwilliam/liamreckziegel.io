export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-[#1A1F35] rounded ${className}`} />;
}

