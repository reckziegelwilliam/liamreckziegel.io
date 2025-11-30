import Link from 'next/link';
import { Hero } from './components/home/hero';
import { WhatIDo } from './components/home/what-i-do';
import { caseStudies } from './data/case-studies';
import { getPublishedPosts } from './db/posts';
import { ArrowRight, Clock } from 'lucide-react';
import { getPersonSchema, getOrganizationSchema, getWebsiteSchema } from './lib/structured-data';
import { PageViewTracker } from './components/page-view-tracker';

export const metadata = {
  title: 'Liam Reckziegel - Founding Engineer & Product Partner',
  description: 'I rebuild broken apps, ship new products, and design systems that last. 6+ years turning 0→1 ideas into production-ready platforms.',
};

export default async function Page() {
  // Fetch recent playbooks
  const recentPlaybooks = await getPublishedPosts(3);
  
  // Get featured case studies (first 2)
  const featuredCaseStudies = caseStudies.slice(0, 2);

  return (
    <>
      {/* Page View Tracking */}
      <PageViewTracker />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            getPersonSchema(),
            getOrganizationSchema(),
            getWebsiteSchema(),
          ]),
        }}
      />

      {/* Hero Section */}
      <Hero />

      {/* What I Do Section */}
      <WhatIDo />

      {/* Featured Work Section */}
      <section className="py-24">
        <h2 className="text-3xl font-semibold mb-4 tracking-tight">
          Featured Work
        </h2>
        <p className="text-[#9CA3AF] dark:text-[#9CA3AF] mb-12 max-w-2xl">
          Real projects where I've rebuilt failing apps, shipped MVPs, and scaled systems from concept to production.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {featuredCaseStudies.map((study) => {
            const colorMap = {
              'founding-engineer': {
                bg: 'bg-[#00D9FF]/10',
                border: 'border-[#00D9FF]/30',
                text: 'text-[#00D9FF]',
                hover: 'hover:border-[#00D9FF]',
              },
              'rescue': {
                bg: 'bg-[#FFB84D]/10',
                border: 'border-[#FFB84D]/30',
                text: 'text-[#FFB84D]',
                hover: 'hover:border-[#FFB84D]',
              },
              'studio': {
                bg: 'bg-[#10B981]/10',
                border: 'border-[#10B981]/30',
                text: 'text-[#10B981]',
                hover: 'hover:border-[#10B981]',
              },
            };
            const colors = colorMap[study.type];

            return (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="block group"
              >
                <div className={`p-6 rounded-xl border-2 ${colors.bg} ${colors.border} ${colors.hover} transition-all hover:scale-105`}>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#00D9FF] transition-colors">
                    {study.company}
                  </h3>
                  <p className={`text-sm font-medium ${colors.text} mb-3`}>
                    {study.role}
                  </p>
                  <p className="text-[#E8E9ED] mb-4">
                    {study.tagline}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    {study.metrics.slice(0, 2).map((metric) => (
                      <div key={metric.label} className="flex-1">
                        <div className="text-[#9CA3AF] text-xs">{metric.label}</div>
                        <div className={`font-semibold ${colors.text}`}>{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[#00D9FF] hover:underline font-medium"
          >
            View All Case Studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Recent Playbooks Section */}
      {recentPlaybooks.length > 0 && (
        <section className="py-24 border-t border-[#1A1F35]">
          <h2 className="text-3xl font-semibold mb-4 tracking-tight">
            Recent Playbooks
          </h2>
          <p className="text-[#9CA3AF] dark:text-[#9CA3AF] mb-12 max-w-2xl">
            Technical guides and lessons learned from building products at scale.
          </p>

          <div className="space-y-6 mb-8">
            {recentPlaybooks.map((post) => (
              <Link
                key={post.slug}
                href={`/playbooks/${post.slug}`}
                className="block group"
              >
                <div className="border-l-4 border-transparent hover:border-[#00D9FF] pl-6 py-4 transition-all">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#00D9FF] transition-colors">
                    {post.title}
                  </h3>
                  {post.subtitle && (
                    <p className="text-[#9CA3AF] dark:text-[#9CA3AF] mb-2">
                      {post.subtitle}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-[#9CA3AF]">
                    {post.reading_time_minutes && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.reading_time_minutes} min read</span>
                      </div>
                    )}
                    {post.type && (
                      <span className="px-2 py-0.5 bg-[#1A1F35] text-[#00D9FF] rounded text-xs uppercase">
                        {post.type}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/playbooks"
              className="inline-flex items-center gap-2 text-[#00D9FF] hover:underline font-medium"
            >
              View All Playbooks <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-24 border-t border-[#1A1F35]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">
            Let's Build Something Together
          </h2>
          <p className="text-lg text-[#9CA3AF] dark:text-[#9CA3AF] mb-8">
            Whether you need a founding engineer to build your product from scratch, 
            or project-based development through my studio, I'm here to help turn your ideas into reality.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact?type=hire"
              className="px-8 py-4 bg-[#00D9FF] text-[#0A0E1A] rounded-lg hover:bg-[#00B8D9] hover:scale-105 transition-all font-medium text-lg"
            >
              Hire Me as a Founding Engineer
            </Link>
            <Link
              href="/contact?type=studio"
              className="px-8 py-4 bg-[#1A1F35] border-2 border-[#00D9FF] text-[#E8E9ED] rounded-lg hover:bg-[#00D9FF]/10 hover:scale-105 transition-all font-medium text-lg"
            >
              Work with Lumenaut Studio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
