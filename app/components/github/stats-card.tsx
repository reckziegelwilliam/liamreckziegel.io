'use client';

import { motion } from 'framer-motion';
import { Star, GitFork, Book, TrendingUp, GitCommit, FileCode } from 'lucide-react';
import type { GitHubStats } from '@/lib/github';

interface GitHubStatsCardProps {
  stats: GitHubStats;
  contributions?: number;
}

export function GitHubStatsCard({ stats, contributions }: GitHubStatsCardProps) {
  const metrics = [
    { 
      label: 'Repositories', 
      value: stats.totalRepos, 
      icon: Book, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    { 
      label: 'Stars Earned', 
      value: stats.totalStars, 
      icon: Star, 
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    },
    { 
      label: 'Forks', 
      value: stats.totalForks, 
      icon: GitFork, 
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    { 
      label: 'Followers', 
      value: stats.followers, 
      icon: TrendingUp, 
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
  ];

  // Add contributions if available
  if (contributions !== undefined) {
    metrics.push({
      label: 'Contributions',
      value: contributions,
      icon: GitCommit,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    });
  }

  if (stats.publicGists > 0) {
    metrics.push({
      label: 'Gists',
      value: stats.publicGists,
      icon: FileCode,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    });
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className={`p-4 rounded-xl ${metric.bgColor} border ${metric.borderColor} hover:scale-105 transition-transform cursor-default`}
        >
          <div className="flex items-center justify-between mb-2">
            <metric.icon className={`w-5 h-5 ${metric.color}`} />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {metric.value.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {metric.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

