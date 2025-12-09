import { caseStudies } from '@/app/data/case-studies';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { PageViewTracker } from '@/app/components/page-view-tracker';
interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const study = caseStudies.find((s) => s.slug === params.slug);

  if (!study) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${study.company} - ${study.title}`,
    description: study.tagline,
    openGraph: {
      title: `${study.company} Case Study | Liam Reckziegel`,
      description: study.tagline,
      type: 'article',
    },
  };
}

export default function CaseStudyPage({ params }: PageProps) {
  const study = caseStudies.find((s) => s.slug === params.slug);

  if (!study) {
    notFound();
  }

  return (
    <section>
      {/* Page View Tracking */}
      <PageViewTracker postSlug={`case-study-${study.slug}`} />

      {/* Back button */}
      <Link
        href="/case-studies"
        className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#00D9FF] mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Case Studies
      </Link>

      {/* Hero */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          {study.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 mb-6 text-lg">
          <span className="text-[#00D9FF] font-semibold">{study.company}</span>
          <span className="text-[#9CA3AF]">•</span>
          <span className="text-[#9CA3AF]">{study.role}</span>
          <span className="text-[#9CA3AF]">•</span>
          <span className="text-[#9CA3AF]">{study.period}</span>
        </div>
        <p className="text-xl text-[#9CA3AF] dark:text-[#9CA3AF] mb-8">
          {study.tagline}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {study.metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-6 bg-[#1A1F35] dark:bg-[#1A1F35] rounded-xl border border-[#00D9FF]/30"
            >
              <div className="text-sm text-[#9CA3AF] mb-2">{metric.label}</div>
              <div className="text-xl font-bold text-[#00D9FF]">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Context */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 tracking-tight">Context</h2>
        <div className="p-8 bg-[#1A1F35] dark:bg-[#1A1F35] rounded-xl border border-[#1A1F35]">
          <p className="text-lg text-[#E8E9ED] mb-6 leading-relaxed">
            {study.context.overview}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-[#9CA3AF] mb-1">Stage</div>
              <div className="text-[#E8E9ED]">{study.context.stage}</div>
            </div>
            <div>
              <div className="text-sm text-[#9CA3AF] mb-1">Team Size</div>
              <div className="text-[#E8E9ED]">{study.context.teamSize}</div>
            </div>
          </div>
        </div>
      </div>

      {/* The Challenge */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 tracking-tight">The Challenge</h2>
        <div className="grid gap-4">
          {study.challenges.map((challenge, index) => (
            <div
              key={index}
              className="p-6 bg-[#1A1F35] dark:bg-[#1A1F35] rounded-xl border border-[#EF4444]/30"
            >
              <p className="text-[#E8E9ED]">{challenge}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What I Did */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 tracking-tight">What I Did</h2>
        <div className="space-y-8">
          {study.whatIDid.map((item, index) => (
            <div
              key={index}
              className="p-8 bg-[#1A1F35] dark:bg-[#1A1F35] rounded-xl border border-[#00D9FF]/30"
            >
              <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
              <p className="text-[#00D9FF] mb-4">{item.description}</p>
              <ul className="space-y-3">
                {item.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-[#E8E9ED]">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Impact */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 tracking-tight">Impact</h2>
        <div className="grid gap-6">
          {study.impact.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-[#1A1F35] dark:bg-[#1A1F35] rounded-xl border border-[#10B981]/30"
            >
              <h3 className="text-xl font-semibold mb-2 text-[#10B981]">{item.label}</h3>
              <p className="text-[#9CA3AF]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech & Architecture */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 tracking-tight">Tech & Architecture</h2>
        <div className="p-8 bg-[#1A1F35] dark:bg-[#1A1F35] rounded-xl border border-[#1A1F35]">
          <div className="flex flex-wrap gap-3">
            {study.tech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-[#0A0E1A] text-[#00D9FF] rounded-lg font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 bg-gradient-to-r from-[#00D9FF]/10 to-[#FFB84D]/10 rounded-xl border border-[#00D9FF]/30">
        <h3 className="text-2xl font-semibold mb-2">
          Need a similar transformation?
        </h3>
        <p className="text-[#9CA3AF] dark:text-[#9CA3AF] mb-6">
          If you're facing similar challenges and need someone who can architect, build, and ship—let's talk.
        </p>
        <Link
          href="/contact?type=hire"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#00D9FF] text-[#0A0E1A] rounded-lg font-medium hover:bg-[#00B8D9] hover:scale-105 transition-all"
        >
          Let's Talk →
        </Link>
      </div>
    </section>
  );
}

