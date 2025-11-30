import Timeline from '../components/work/timeline';
import type { Metadata } from 'next';
import { PageViewTracker } from '../components/page-view-tracker';

export const metadata: Metadata = {
  title: 'Work Experience',
  description: 'My professional journey building products, leading teams, and scaling systems from 0 to production.',
  openGraph: {
    title: 'Work Experience | Liam Reckziegel',
    description: 'My professional journey building products, leading teams, and scaling systems from 0 to production.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <section>
      <PageViewTracker />
      <h1 className="font-bold text-4xl mb-4 tracking-tight">
        Work Experience
      </h1>
      <p className="text-[#9CA3AF] dark:text-[#9CA3AF] mb-12 max-w-2xl">
        My professional journey building products, leading teams, and scaling systems. 
        From founding engineer roles to studio work, here's where I've made an impact.
      </p>
      
      <Timeline />
    </section>
  );
}
