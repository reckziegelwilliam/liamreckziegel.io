import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { experience } from '@/data/experience';

export const metadata: Metadata = {
  title: 'Work Experience',
  description: 'A comprehensive timeline of my professional journey, featuring roles at HELPAR, HAVE YOU MET, and other innovative companies.',
  openGraph: {
    title: 'Work Experience | Liam Reckziegel',
    description: 'Explore my professional journey through interactive timeline showcasing 7+ years of software engineering experience.',
    type: 'profile',
  },
};

const Timeline = dynamic(() => import('@/components/work/timeline'), {
  ssr: true,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gray-500 dark:text-gray-400">Loading timeline...</div>
    </div>
  )
});

// Generate structured data for SEO
function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "William Reckziegel",
    "alternateName": "Liam Reckziegel",
    "url": "https://liamrex.io/work",
    "jobTitle": "Senior Full Stack Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": experience[0]?.company || "HELPAR"
    },
    "alumniOf": experience.map(exp => ({
      "@type": "Organization",
      "name": exp.company,
      "location": {
        "@type": "Place",
        "address": exp.location
      }
    })),
    "hasOccupation": experience.map(exp => ({
      "@type": "Occupation",
      "name": exp.title,
      "occupationLocation": {
        "@type": "Place",
        "address": exp.location
      },
      "estimatedSalary": {
        "@type": "MonetaryAmountDistribution",
        "name": "base"
      },
      "description": exp.description,
      "skills": exp.tech?.join(', ') || '',
      "responsibilities": exp.achievements
    }))
  };
}

// Calculate stats
const totalYears = new Date().getFullYear() - 2018;
const companiesCount = experience.length;
const uniqueTech = new Set(experience.flatMap(e => e.tech || []));

export default function WorkPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />

      <section className="relative">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-12">
          <h1 className="font-bold text-4xl mb-4 tracking-tight">
            Work Experience
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-6">
            A journey through my professional career, highlighting key roles, 
            achievements, and technologies I've worked with.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl">
            <div className="text-center p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {totalYears}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Years
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {companiesCount}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Companies
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {uniqueTech.size}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Technologies
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <Timeline />
      </section>
    </>
  );
}
