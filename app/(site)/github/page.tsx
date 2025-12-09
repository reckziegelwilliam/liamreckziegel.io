import type { Metadata } from 'next';
import { Github, ExternalLink } from 'lucide-react';
import { 
  getGitHubStats, 
  getContributionStats, 
  getRecentActivity,
  getLanguageStats,
  getTopRepositories 
} from '@/lib/github';
import { GitHubStatsCard } from '@/components/github/stats-card';
import { ContributionGraph } from '@/components/github/contribution-graph';
import { ActivityFeed } from '@/components/github/activity-feed';
import { LanguageStats } from '@/components/github/language-stats';

export const metadata: Metadata = {
  title: 'GitHub Activity',
  description: 'Live stats and activity from my GitHub profile',
  openGraph: {
    title: 'GitHub Activity | Liam Reckziegel',
    description: 'Explore my open source contributions and GitHub statistics',
    type: 'profile',
  },
};

export default async function GitHubPage() {
  // Fetch all GitHub data in parallel
  const [stats, contributions, activity, languages, topRepos] = await Promise.all([
    getGitHubStats(),
    getContributionStats(),
    getRecentActivity(20),
    getLanguageStats(),
    getTopRepositories(6),
  ]);

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Github className="w-8 h-8 text-gray-900 dark:text-white" />
          <h1 className="font-bold text-4xl tracking-tight">GitHub Activity</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Live stats from my GitHub profile{' '}
          <a
            href="https://github.com/reckziegelwilliam"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
          >
            @reckziegelwilliam
            <ExternalLink className="w-4 h-4" />
          </a>
        </p>
      </div>

      {/* Stats Cards */}
      <section>
        <GitHubStatsCard stats={stats} contributions={contributions.totalContributions} />
      </section>

      {/* Contribution Graph */}
      <section>
        <ContributionGraph calendar={contributions} />
      </section>

      {/* Top Repositories */}
      {topRepos.length > 0 && (
        <section>
          <h2 className="font-bold text-2xl mb-6 tracking-tighter">
            Top Repositories
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {topRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {repo.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 flex-shrink-0 ml-2" />
                </div>
                
                {repo.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {repo.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-blue-500" />
                      {repo.language}
                    </span>
                  )}
                  {repo.stars > 0 && (
                    <span className="flex items-center gap-1">
                      ⭐ {repo.stars}
                    </span>
                  )}
                  {repo.forks > 0 && (
                    <span className="flex items-center gap-1">
                      🔱 {repo.forks}
                    </span>
                  )}
                </div>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Languages and Activity */}
      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <LanguageStats languages={languages} />
        </section>

        <section>
          <ActivityFeed activities={activity} />
        </section>
      </div>

      {/* Link to GitHub Profile */}
      <section className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
        <a
          href="https://github.com/reckziegelwilliam"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
        >
          <Github className="w-5 h-5" />
          View Full Profile on GitHub
          <ExternalLink className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}

