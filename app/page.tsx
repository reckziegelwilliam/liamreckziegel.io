import React from 'react';
import { Hero } from '@/components/home/hero';
import { Skills } from '@/components/home/skills';
import { Experience } from '@/components/home/experience';
import { Projects } from '@/components/home/projects';
import { GitHubStatsCard } from '@/components/github/stats-card';
import { LanguageStats } from '@/components/github/language-stats';
import { getGitHubStats, getLanguageStats, getCurrentYearContributions } from '@/lib/github';
import { skills } from '@/app/data/skill';
import { experience } from '@/app/data/experience';
import { projects } from '@/app/data/projects';
import { PageWrapper } from '@/components/page-wrapper';

export default async function Page() {
  // Fetch GitHub data in parallel
  const [githubStats, languageStats, contributions] = await Promise.all([
    getGitHubStats(),
    getLanguageStats(),
    getCurrentYearContributions(),
  ]);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <Hero />

      {/* GitHub Activity Section */}
      <section className="my-16">
        <h2 className="font-bold text-2xl mb-6 tracking-tighter">
          GitHub Activity
        </h2>
        <GitHubStatsCard stats={githubStats} contributions={contributions} />
        
        <div className="mt-8">
          <LanguageStats languages={languageStats} />
        </div>

        <div className="mt-6 text-center">
          <a
            href="/github"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/20"
          >
            View Full GitHub Profile →
          </a>
        </div>
      </section>

      {/* Skills Section */}
      <Skills skills={skills} />

      {/* Work Experience Section */}
      <Experience experience={experience} />

      {/* Projects Section */}
      <Projects projects={projects} />
    </PageWrapper>
  );
}
