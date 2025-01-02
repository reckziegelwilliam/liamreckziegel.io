import { ArrowDown } from 'lucide-react';
import dynamic from 'next/dynamic';

const Timeline = dynamic(() => import('@/components/work/timeline'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading timeline...</div>
    </div>
  )
});


export default function Page() {
  return (
    <section className="relative mt-[60px]">
      {/* Header Section - adjusted z-index and pointer-events */}
      <div 
        className="fixed top-[80px] left-0 right-0 bg-gradient-to-b from-background via-background/80 to-transparent pb-12 pointer-events-none"
        style={{ zIndex: 20 }}
      >
        <div className="max-w-4xl mx-auto px-4 pt-8">
          {/* Make text content clickable */}
          <div className="flex flex-col gap-6 pointer-events-auto">
            <div className="flex items-baseline justify-between">
              <h1 className="font-medium text-3xl tracking-tighter">
                my work
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                <span className="text-sm">scroll to explore</span>
                <ArrowDown size={16} />
              </div>
            </div>
            
            <div className="flex flex-col gap-4 text-muted-foreground max-w-xl">
              <p className="text-lg leading-relaxed">
                A journey through my professional timeline, showcasing key projects 
                and achievements in chronological order.
              </p>
              <p className="text-sm">
                Tip: Scroll down slowly to experience the full journey
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Component */}
      <div className="relative top-[80px]" style={{ zIndex: 10 }}>
        <Timeline />
      </div>

      {/* Initial View Gradient Overlay - adjusted z-index */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"
        style={{ zIndex: 15 }}
      />
    </section>
  );
}