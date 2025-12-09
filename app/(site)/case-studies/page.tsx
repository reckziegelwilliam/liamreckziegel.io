import { caseStudies } from '@/app/data/case-studies';
import Link from 'next/link';
import { Briefcase, Wrench, Users, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Deep dives into how I\'ve rebuilt failing apps, shipped MVPs, and scaled systems from 0 to production.',
  openGraph: {
    title: 'Case Studies | Liam Reckziegel',
    description: 'Deep dives into how I\'ve rebuilt failing apps, shipped MVPs, and scaled systems from 0 to production.',
    type: 'website',
  },
};

const typeConfig = {
  'founding-engineer': {
    icon: Briefcase,
    color: 'cyan',
    label: 'Founding Engineer',
  },
  'rescue': {
    icon: Wrench,
    color: 'amber',
    label: 'Rescue & Rebuild',
  },
  'studio': {
    icon: Users,
    color: 'green',
    label: 'Studio Work',
  },
};

export default function CaseStudiesPage() {
  return (
    <section>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
        Case Studies
      </h1>
      <p className="text-lg text-[#9CA3AF] dark:text-[#9CA3AF] mb-12 max-w-2xl">
        Deep dives into projects where I've rebuilt failing apps, shipped MVPs, and scaled systems 
        from concept to production. Real problems, real solutions, real outcomes.
      </p>

      <div className="grid gap-8">
        {caseStudies.map((study) => {
          const config = typeConfig[study.type];
          const Icon = config.icon;
          
          const colorMap = {
            cyan: {
              bg: 'bg-[#00D9FF]/10',
              border: 'border-[#00D9FF]/30',
              hover: 'hover:border-[#00D9FF]',
              text: 'text-[#00D9FF]',
              badge: 'bg-[#00D9FF]/20 text-[#00D9FF]',
            },
            amber: {
              bg: 'bg-[#FFB84D]/10',
              border: 'border-[#FFB84D]/30',
              hover: 'hover:border-[#FFB84D]',
              text: 'text-[#FFB84D]',
              badge: 'bg-[#FFB84D]/20 text-[#FFB84D]',
            },
            green: {
              bg: 'bg-[#10B981]/10',
              border: 'border-[#10B981]/30',
              hover: 'hover:border-[#10B981]',
              text: 'text-[#10B981]',
              badge: 'bg-[#10B981]/20 text-[#10B981]',
            },
          };
          
          const colors = colorMap[config.color];

          return (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="block group"
            >
              <article className={`p-8 rounded-xl border-2 ${colors.bg} ${colors.border} ${colors.hover} transition-all group-hover:scale-[1.02]`}>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <Icon className={`w-8 h-8 ${colors.text} flex-shrink-0 mt-1`} />
                    <div>
                      <span className={`inline-block px-3 py-1 rounded text-sm ${colors.badge} mb-3`}>
                        {config.label}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-[#00D9FF] transition-colors">
                        {study.company}
                      </h2>
                      <p className={`text-lg ${colors.text} font-medium mb-2`}>
                        {study.role}
                      </p>
                      <p className="text-[#9CA3AF] text-sm">{study.period}</p>
                    </div>
                  </div>
                </div>

                <p className="text-lg mb-6 text-[#E8E9ED]">
                  {study.tagline}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="p-4 bg-[#0A0E1A] rounded-lg">
                      <div className="text-sm text-[#9CA3AF] mb-1">{metric.label}</div>
                      <div className={`font-semibold ${colors.text}`}>{metric.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-[#1A1F35]">
                  <div className="flex flex-wrap gap-2 flex-1">
                    {study.tech.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-[#0A0E1A] rounded text-sm text-[#9CA3AF]"
                      >
                        {tech}
                      </span>
                    ))}
                    {study.tech.length > 5 && (
                      <span className="px-2 py-1 text-sm text-[#9CA3AF]">
                        +{study.tech.length - 5} more
                      </span>
                    )}
                  </div>
                  <div className={`flex items-center gap-2 ${colors.text} group-hover:gap-4 transition-all`}>
                    Read full story <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

