'use client';

import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, Star, GitFork, MessageSquare, GitBranch, Tag, Plus } from 'lucide-react';
import type { GitHubActivity } from '@/lib/github';

interface ActivityFeedProps {
  activities: GitHubActivity[];
}

const EVENT_ICONS: Record<string, any> = {
  PushEvent: GitCommit,
  PullRequestEvent: GitPullRequest,
  WatchEvent: Star,
  ForkEvent: GitFork,
  IssueCommentEvent: MessageSquare,
  IssuesEvent: MessageSquare,
  CreateEvent: Plus,
  ReleaseEvent: Tag,
  PublicEvent: GitBranch,
};

function getEventMessage(activity: GitHubActivity): string {
  const { type, payload } = activity;
  
  switch (type) {
    case 'PushEvent':
      const commits = payload.commits?.length || 0;
      return `Pushed ${commits} ${commits === 1 ? 'commit' : 'commits'}`;
    
    case 'PullRequestEvent':
      return `${payload.action} pull request`;
    
    case 'WatchEvent':
      return 'Starred repository';
    
    case 'ForkEvent':
      return 'Forked repository';
    
    case 'IssueCommentEvent':
      return 'Commented on issue';
    
    case 'IssuesEvent':
      return `${payload.action} issue`;
    
    case 'CreateEvent':
      return `Created ${payload.ref_type}`;
    
    case 'ReleaseEvent':
      return `Released ${payload.release?.tag_name || 'new version'}`;
    
    case 'PublicEvent':
      return 'Made repository public';
    
    default:
      return type.replace('Event', '');
  }
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No recent activity
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
        Recent Activity
      </h3>
      
      <div className="space-y-2">
        {activities.map((activity, index) => {
          const Icon = EVENT_ICONS[activity.type] || GitCommit;
          const message = getEventMessage(activity);
          const repoName = activity.repo.split('/')[1] || activity.repo;
          
          return (
            <motion.div
              key={`${activity.repo}-${index}-${activity.created_at}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
            >
              <div className="flex-shrink-0 mt-1">
                <Icon className="w-4 h-4 text-blue-500" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white font-medium">
                  {message}
                </p>
                <a
                  href={`https://github.com/${activity.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 truncate block"
                >
                  {repoName}
                </a>
              </div>
              
              <div className="flex-shrink-0">
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {formatTimeAgo(activity.created_at)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {activities.length >= 10 && (
        <a
          href={`https://github.com/reckziegelwilliam`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:underline pt-2"
        >
          View all activity on GitHub →
        </a>
      )}
    </div>
  );
}

