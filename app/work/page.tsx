import Timeline from '../components/work/timeline';
import { ArrowDown } from 'lucide-react';

export default function Page() {
  return (
    <section className="relative">
      {/* Header Section */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-b from-background to-transparent pb-12">
        <div className="max-w-4xl mx-auto px-4 pt-8">
          <div className="flex flex-col gap-6">
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
      <div className="relative">
        <Timeline />
      </div>

      {/* Initial View Gradient Overlay */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"
        style={{ zIndex: 1 }}
      />
    </section>
  );
}