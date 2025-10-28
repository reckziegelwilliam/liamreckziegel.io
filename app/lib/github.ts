'use server';

import { unstable_cache as cache, unstable_noStore as noStore } from 'next/cache';

const GITHUB_USERNAME = 'reckziegelwilliam';
const GITHUB_API = 'https://api.github.com';

async function fetchGitHub(endpoint: string) {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  // Add token if available
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`${GITHUB_API}${endpoint}`, {
    headers,
    next: { revalidate: 3600 }, // 1 hour default cache
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
}

async function fetchGitHubGraphQL(query: string, variables: any = {}) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  following: number;
  publicGists: number;
}

export const getGitHubStats = cache(
  async (): Promise<GitHubStats> => {
    try {
      const [user, repos] = await Promise.all([
        fetchGitHub(`/users/${GITHUB_USERNAME}`),
        fetchGitHub(`/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
      ]);

      const totalStars = repos.reduce((acc: number, repo: any) => 
        acc + (repo.stargazers_count || 0), 0
      );
      const totalForks = repos.reduce((acc: number, repo: any) => 
        acc + (repo.forks_count || 0), 0
      );

      return {
        totalRepos: user.public_repos || 0,
        totalStars,
        totalForks,
        followers: user.followers || 0,
        following: user.following || 0,
        publicGists: user.public_gists || 0,
      };
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      return {
        totalRepos: 0,
        totalStars: 0,
        totalForks: 0,
        followers: 0,
        following: 0,
        publicGists: 0,
      };
    }
  },
  ['github-stats'],
  { revalidate: 3600, tags: ['github-stats'] }
);

export interface Repository {
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  url: string;
  homepage: string | null;
  topics: string[];
  lastUpdated: string;
  isPrivate: boolean;
}

export const getTopRepositories = cache(
  async (limit: number = 6): Promise<Repository[]> => {
    try {
      const repos = await fetchGitHub(
        `/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=public`
      );

      return repos
        .filter((repo: any) => !repo.fork && !repo.private)
        .sort((a: any, b: any) => {
          // Sort by stars, then by updated date
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        })
        .slice(0, limit)
        .map((repo: any) => ({
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          language: repo.language,
          url: repo.html_url,
          homepage: repo.homepage,
          topics: repo.topics || [],
          lastUpdated: repo.updated_at,
          isPrivate: repo.private,
        }));
    } catch (error) {
      console.error('Error fetching top repositories:', error);
      return [];
    }
  },
  ['github-top-repos'],
  { revalidate: 3600, tags: ['github-repos'] }
);

export interface LanguageStat {
  name: string;
  percentage: number;
  bytes: number;
  color: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Shell: '#89e051',
  Vue: '#41b883',
  Dockerfile: '#384d54',
};

export const getLanguageStats = cache(
  async (): Promise<LanguageStat[]> => {
    try {
      const repos = await fetchGitHub(
        `/users/${GITHUB_USERNAME}/repos?per_page=100&type=public`
      );

      const languageBytes: Record<string, number> = {};

      // Fetch languages for each repo (limit to avoid rate limits)
      const repoPromises = repos
        .filter((repo: any) => !repo.fork)
        .slice(0, 50)
        .map(async (repo: any) => {
          try {
            const languages = await fetchGitHub(`/repos/${GITHUB_USERNAME}/${repo.name}/languages`);
            return languages;
          } catch {
            return {};
          }
        });

      const allLanguages = await Promise.all(repoPromises);

      allLanguages.forEach((languages) => {
        Object.entries(languages).forEach(([lang, bytes]) => {
          languageBytes[lang] = (languageBytes[lang] || 0) + (bytes as number);
        });
      });

      const total = Object.values(languageBytes).reduce((a, b) => a + b, 0);

      if (total === 0) return [];

      return Object.entries(languageBytes)
        .map(([name, bytes]) => ({
          name,
          percentage: (bytes / total) * 100,
          bytes,
          color: LANGUAGE_COLORS[name] || '#6366f1',
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 8);
    } catch (error) {
      console.error('Error fetching language stats:', error);
      return [];
    }
  },
  ['github-languages'],
  { revalidate: 86400, tags: ['github-languages'] } // 24 hours
);

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export const getContributionStats = cache(
  async (): Promise<ContributionCalendar> => {
    if (!process.env.GITHUB_TOKEN) {
      return { totalContributions: 0, weeks: [] };
    }

    try {
      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    color
                  }
                }
              }
            }
          }
        }
      `;

      const data = await fetchGitHubGraphQL(query, { username: GITHUB_USERNAME });
      return data.user.contributionsCollection.contributionCalendar;
    } catch (error) {
      console.error('Error fetching contribution stats:', error);
      return { totalContributions: 0, weeks: [] };
    }
  },
  ['github-contributions'],
  { revalidate: 3600, tags: ['github-contributions'] }
);

export interface GitHubActivity {
  type: string;
  repo: string;
  created_at: string;
  payload: any;
}

export const getRecentActivity = cache(
  async (limit: number = 10): Promise<GitHubActivity[]> => {
    try {
      const events = await fetchGitHub(`/users/${GITHUB_USERNAME}/events/public?per_page=${limit}`);

      return events.map((event: any) => ({
        type: event.type,
        repo: event.repo.name,
        created_at: event.created_at,
        payload: event.payload,
      }));
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      return [];
    }
  },
  ['github-activity'],
  { revalidate: 600, tags: ['github-activity'] } // 10 minutes
);

// Helper function to get current year contributions for stats
export async function getCurrentYearContributions(): Promise<number> {
  try {
    const calendar = await getContributionStats();
    return calendar.totalContributions;
  } catch {
    return 0;
  }
}

